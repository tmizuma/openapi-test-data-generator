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
    this._schemas = parsedObject.components.schemas;
    const schemaDataMap = new Map();
    schemaNameList.forEach((s) => {
      const schemaName = s.replaceAll('.yaml', '');
      if (context.ignoreList.indexOf(schemaName) === -1) {
        schemaDataMap.set(
          schemaName,
          this._generateTestDataFromSchema(schemaName, {
            n: context.numberOfArrayTestData,
            stateless: context.stateless,
            exampleSuffix: context.exampleSuffix,
            depthOfRecursion: 0
          })
        );
      } else {
        Logger.warn(
          `[ignore] output: ==> ${context.outputPath}/${schemaName}${context.extension}`
        );
      }
    });
    this._schemaDataMap = schemaDataMap;
  }

  getSchemaDataMap() {
    return this._schemaDataMap;
  }

  /**
   * Create schema sample data
   * @param {*} schemas
   * @param {*} name
   * @param {*} options
   * @returns {Array<object>} sample data
   */
  _generateTestDataFromSchema = (name, options) => {
    const schema = this._schemas[name];
    const numberOfArray = options.n;
    const schemaProperties = schema.properties;
    const resultArray = [];

    if (schema.$ref) {
      const schemaName = schema.$ref.replace('#/components/schemas/', '');
      return this._generateTestDataFromSchema(schemaName, {
        ...options,
        depthOfRecursion: options.depthOfRecursion + 1
      });
    }

    for (let i = 0; i < numberOfArray; i++) {
      // create sample data for a specified number of pieces.
      resultArray.push(
        this._createSampleDataFromProperties(schemaProperties, name, options, i)
      );
    }
    return resultArray;
  };

  _createSampleDataFromProperties = (properties, name, options, i = 0) => {
    const element = {};
    const stateless = options.stateless;
    Object.keys(properties).forEach((key) => {
      const property = properties[key];
      let sampleData;

      // enum type
      if (property.enum && property.enum.length > 0) {
        sampleData = `${property.enum[i % property.enum.length]}`;
      }

      // if exists example data
      const suffix = options.exampleSuffix ? `_${i}` : '';
      sampleData =
        property.example && !(property.enum && property.enum.length > 0) ?
        `${property.example}${suffix}` :
        sampleData;

      // create sample data recursively if the property type is $ref.
      if (property.$ref) {
        sampleData = this._generateTestDataFromSchema(
          property.$ref.replace('#/components/schemas/', ''), {...options, n: 1, depthOfRecursion: options.depthOfRecursion + 1 }
        )[0];
      }

      if (property.type === 'object') {
        sampleData = this._createSampleDataFromProperties(
          property.properties,
          name,
          options,
          i
        );
      }

      // otherwise, create sample data from property attributes
      if (sampleData === undefined) {
        const statelessHashKey = `${name}-${key}-${options.depthOfRecursion}-${i}`;
        sampleData = this.createSampleDataFromPropertyAttributes(
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

  createSampleDataFromPropertyAttributes = (
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
              this.createSampleDataFromPropertyAttributes(
                property.items.properties,
                stateless,
                `${statelessHashKey}-${k}`
              ) + suffix
            );
          } else {
            array.push(
              this.createSampleDataFromPropertyAttributes(
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

  _getNextDepthOfRecursion = (depth) => {
    if (!depth) {
      return 1;
    }
    return depth + 1;
  };
}