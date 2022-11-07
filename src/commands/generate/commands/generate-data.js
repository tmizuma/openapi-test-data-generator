import { Logger } from '../logger/index.js';
import { DEFAULT_ARRAY_TYPE_TEST_DATA_LENGTH } from '../const/index.js';
import {
  createRandomNumberByRange,
  createRandomNumberByMaxValueStateless,
  createRandomStringByRange,
  getRandomYmd,
  getRandomYmdhhmmss,
  createRandomStringByMaxLengtheStateless,
  createRandomBooleanStateless,
  getRandomYmdStateless,
  getRandomYmdhhmmssStateless
} from '../utils/index.js';

export default class GenerateDataCommand {
  _context;
  _schemaDataMap;
  _schemas;

  setContext(context) {
    this._context = context;
    return this;
  }

  exec(schemaNameList, parsedObject) {
    const context = this._context;
    this._schemas = parsedObject.components.schemas; // all schemas
    const schemaDataMap = new Map();

    for (let i = 0; i < schemaNameList.length; i++) {
      const targetSchema = schemaNameList[i].replaceAll('.yaml', '');
      if (context.ignoreList.indexOf(targetSchema) !== -1) {
        Logger.warn(
          `[ignore] output: ==> ${context.outputPath}/${targetSchema}${context.extension}`
        );
        continue;
      }

      const data = this._generateDataFromTargetSchemaWithOptions(targetSchema, {
        n: context.numberOfArrayTestData,
        stateless: context.stateless,
        exampleSuffix: context.exampleSuffix,
        depthOfSchemaRecursion: 0
      });

      schemaDataMap.set(targetSchema, data);
    }
    this._schemaDataMap = schemaDataMap;
  }

  getSchemaDataMap() {
    return this._schemaDataMap;
  }

  /**
   * Create schema sample data
   * @param {*} schemas
   * @param {*} targetSchemaName
   * @param {*} options
   * @returns {Array<object>} sample data
   */
  _generateDataFromTargetSchemaWithOptions = (
    targetSchemaName,
    options,
    depthOfSchemaRecursion = 0
  ) => {
    const schema = this._schemas[targetSchemaName];
    const numberOfData = options.n;
    const schemaProperties = schema.properties;
    const resultArray = [];

    if (schema.$ref) {
      const schemaName = schema.$ref.replace('#/components/schemas/', '');
      return this._generateDataFromTargetSchemaWithOptions(
        schemaName,
        options,
        depthOfSchemaRecursion + 1
      );
    }

    for (let i = 0; i < numberOfData; i++) {
      // create sample data for a specified number of pieces.
      resultArray.push(
        this._createDataFromProperties(
          schemaProperties,
          targetSchemaName,
          options,
          i,
          depthOfSchemaRecursion
        )
      );
    }
    return resultArray;
  };

  _createDataFromProperties = (
    properties,
    name,
    options,
    n = 0,
    depthOfSchemaRecursion
  ) => {
    const element = {};
    const stateless = options.stateless;
    Object.keys(properties).forEach((key) => {
      const property = properties[key];
      let sampleData;

      // enum type
      if (property.enum && property.enum.length > 0) {
        sampleData = `${property.enum[n % property.enum.length]}`;
      }

      // if exists example data
      const suffix = options.exampleSuffix ? `_${n}` : '';
      sampleData =
        property.example && !(property.enum && property.enum.length > 0) ?
        `${property.example}${suffix}` :
        sampleData;

      // create sample data recursively if the property type is $ref.
      if (property.$ref) {
        sampleData = this._generateDataFromTargetSchemaWithOptions(
          property.$ref.replace('#/components/schemas/', ''), {...options, n: 1 },
          depthOfSchemaRecursion
        )[0];
      }

      if (property.type === 'object') {
        sampleData = this._createDataFromProperties(
          property.properties,
          name,
          options,
          n,
          depthOfSchemaRecursion
        );
      }

      // otherwise, create sample data from property attributes
      if (sampleData === undefined) {
        const statelessHashKey = `${name}-${key}-${depthOfSchemaRecursion}-${n}`;
        sampleData = this._createSampleDataFromPropertyAttributes(
          property,
          stateless,
          options.exampleSuffix,
          statelessHashKey
        );
      }
      element[key] = sampleData;
    });
    return element;
  };

  _createSampleDataFromPropertyAttributes = (
    property,
    stateless = false,
    exampleSuffix,
    statelessHashKey = ''
  ) => {
    let value;
    switch (property.type) {
      case 'string':
        if (property.example) {
          value = property.example;
          break;
        }

        if (property.format === 'date-time') {
          // create a random date-time data
          value = stateless ?
            getRandomYmdhhmmssStateless('2000/01/01', statelessHashKey) :
            getRandomYmdhhmmss('2000/01/01');
        } else if (property.format === 'date') {
          // create a random date data
          value = stateless ?
            getRandomYmdStateless('2000/01/01', statelessHashKey) :
            getRandomYmd('2000/01/01');
        } else {
          value = stateless ?
            createRandomStringByMaxLengtheStateless(
              statelessHashKey,
              property.maxLength
            ) :
            createRandomStringByRange(property.minLength, property.maxLength);
        }
        break;
      case 'number':
        // create a random number
        value = stateless ?
          createRandomNumberByMaxValueStateless(
            statelessHashKey,
            property.minimum,
            property.maximum
          ) :
          createRandomNumberByRange(property.minimum, property.maximum);
        break;
      case 'integer':
        // create a random number
        value = stateless ?
          createRandomNumberByMaxValueStateless(
            statelessHashKey,
            property.minimum,
            property.maximum
          ) :
          createRandomNumberByRange(property.minimum, property.maximum);
        break;
      case 'array':
        if (property.items === undefined) {
          value = [];
          break;
        }
        const array = [];
        for (let k = 0; k < DEFAULT_ARRAY_TYPE_TEST_DATA_LENGTH; k++) {
          const suffix = exampleSuffix ? `_${k}` : '';
          if (property.items.type === 'object') {
            array.push(
              this._createSampleDataFromPropertyAttributes(
                property.items.properties,
                stateless,
                `${statelessHashKey}-${k}`
              ) + suffix
            );
          } else {
            array.push(
              this._createSampleDataFromPropertyAttributes(
                property.items,
                stateless,
                `${statelessHashKey}-${k}`
              ) + suffix
            );
          }
        }
        value = array;
        break;
      case 'boolean':
        value = stateless ?
          createRandomBooleanStateless(statelessHashKey) :
          Math.random() > 1 / 2;
        break;
      default:
        // otherwise; {}
        value = {};
    }

    return value;
  };

  _getNextdepthOfSchemaRecursion = (depth) => {
    if (!depth) {
      return 1;
    }
    return depth + 1;
  };
}