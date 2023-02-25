import { Logger } from '../../logger/index.js';
import {
  MAX_RECURSION,
  NEED_TO_BE_REPLACE_BY_OPENAI_RESPONSE
} from '../../const/index.js';
import { generateNumberTypeData } from './property-type/number.js';
import { generateStringTypeData } from './property-type/string.js';
import { generateBooleanTypeData } from './property-type/boolean.js';
import { generateArrayTypeData } from './property-type/array.js';
import { Type } from '../../../enum/type.js';
import { fetch } from '../../utils/chatGPT.js';

export default class GenerateDataCommand {
  _context;
  _schemaDataMap;
  _schemas;

  setContext(context) {
    this._context = context;
    return this;
  }

  exec(schemaNameList, parsedObject, openApiKey) {
    const context = this._context;
    this._schemas = parsedObject.components.schemas; // all schemas
    let schemaDataMap = {};

    // Generating all schemas' test data from schema name list
    for (let i = 0; i < schemaNameList.length; i++) {
      let targetSchemaName = schemaNameList[i].replaceAll('.yaml', '');
      if (context.ignoreList.indexOf(targetSchemaName) !== -1) {
        Logger.warn(
          `[ignore] output: ==> ${context.outputPath}/${targetSchemaName}${context.extension}`
        );
        continue;
      }

      if (this._schemas[targetSchemaName].$ref)
        targetSchemaName = schema.$ref.replace('#/components/schemas/', '');

      const data = this._generateNumberOfTargetSchemaDataSpecifiedByOption(
        targetSchemaName, {
          n: context.numberOfData,
          stateless: context.stateless,
          ai: context.ai,
          exampleSuffix: context.exampleSuffix,
          depthOfSchemaRefRecursion: 0,
          avoidAIGenerateList: context.avoidAIGenerateList,
          openApiKey
        }
      );
      schemaDataMap = {
        ...schemaDataMap,
        ... {
          [targetSchemaName]: data
        }
      };
    }
    this._schemaDataMap = schemaDataMap;
  }

  replaceStringPropertyDataByOpenAI = async(apiKey, numberOfData) => {
    if (!apiKey) return;
    const propertySet = new Set(); // these properties will be replaced by openai response value
    for (const schemaName of Object.keys(this._schemaDataMap)) {
      this._findPropertyNamesNeedToBeReplaceByOpenAIResponse(
        this._schemaDataMap[schemaName][0],
        propertySet
      );
    }
    const propertyMap = new Map();
    for (let propertyName of propertySet) {
      propertyMap.set(
        propertyName,
        await fetch(apiKey, propertyName, numberOfData)
      );
    }
    console.log(propertyMap);
    if (propertyMap.size === 0) return;
    const replacedSchemaDataMap = this._replaceByOpenaiData(
      undefined,
      this._schemaDataMap,
      propertyMap,
      0
    );

    this._schemaDataMap = replacedSchemaDataMap;
  };

  getSchemaDataMap() {
    return this._schemaDataMap;
  }

  _replaceByOpenaiData = (key, target, propertyMap, index = 0) => {
    if (Array.isArray(target)) {
      const newArray = [];
      for (let i = 0; i < target.length; i++) {
        newArray.push(
          this._replaceByOpenaiData(key, target[i], propertyMap, i)
        );
      }
      return newArray;
    }

    if (typeof target === 'object') {
      const newObject = {};
      const keys = Object.keys(target);
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        const v = target[k];
        newObject[k] = this._replaceByOpenaiData(k, v, propertyMap, index);
      }
      return newObject;
    }

    if (target === NEED_TO_BE_REPLACE_BY_OPENAI_RESPONSE && key !== undefined) {
      return propertyMap.get(key)[index];
    }
    return target;
  };

  _findPropertyNamesNeedToBeReplaceByOpenAIResponse = (obj, propertySet) => {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      const propertyName = keys[i];
      const propertyValue = obj[propertyName];
      if (propertyValue === NEED_TO_BE_REPLACE_BY_OPENAI_RESPONSE) {
        propertySet.add(propertyName);
        continue;
      }
      if (Array.isArray(propertyValue)) {
        propertyValue.forEach((v) => {
          if (v === NEED_TO_BE_REPLACE_BY_OPENAI_RESPONSE) {
            propertySet.add(propertyName);
          } else if (typeof v === 'object') {
            this._findPropertyNamesNeedToBeReplaceByOpenAIResponse(
              v,
              propertySet
            );
          }
        });
      } else if (typeof propertyValue === 'object') {
        this._findPropertyNamesNeedToBeReplaceByOpenAIResponse(
          propertyValue,
          propertySet
        );
      }
    }
  };

  /**
   * Create schema sample data
   * @param {*} schemas
   * @param {*} targetSchemaName
   * @param {*} options
   * @returns {Array<object>} sample data
   */
  _generateNumberOfTargetSchemaDataSpecifiedByOption = (
    targetSchemaName,
    options,
    depthOfSchemaRefRecursion = 0
  ) => {
    const schema = this._schemas[targetSchemaName];
    const numberOfData = options.n;
    const schemaProperties = schema.properties;
    const resultArray = [];
    if (depthOfSchemaRefRecursion >= MAX_RECURSION) {
      return [];
    }
    // create sample data for a specified number of pieces.
    for (let i = 0; i < numberOfData; i++) {
      resultArray.push(
        this._generateDataFromTargetSchemaProperties(
          schemaProperties,
          targetSchemaName,
          options,
          i,
          depthOfSchemaRefRecursion
        )
      );
    }
    return resultArray;
  };

  _generateDataFromTargetSchemaProperties = (
    properties,
    name,
    options,
    indexOfMultiData = 0,
    depthOfSchemaRefRecursion
  ) => {
    const element = {};
    const stateless = options.stateless;

    if (depthOfSchemaRefRecursion >= MAX_RECURSION) return;

    // Generating data from properties
    Object.keys(properties).forEach((key) => {
      const property = {...properties[key], key };
      let data;
      // enum type
      if (property.enum && property.enum.length > 0) {
        data = `${property.enum[indexOfMultiData % property.enum.length]}`;
      }

      // if exists example and NOT ai mode, data will not be generated randomly but set example with suffix
      const suffix = options.exampleSuffix ? `_${indexOfMultiData}` : '';
      data =
        property.example &&
        !options.ai &&
        !(property.enum && property.enum.length > 0) ?
        `${property.example}${suffix}` :
        data;

      // generate test data recursively if the property type is $ref.
      if (property.$ref) {
        data = this._generateNumberOfTargetSchemaDataSpecifiedByOption(
          property.$ref.replace('#/components/schemas/', ''), {...options, n: 1 },
          depthOfSchemaRefRecursion + 1
        )[0];
      }

      if (property.type === Type.OBJECT) {
        data = this._generateDataFromTargetSchemaProperties(
          property.properties,
          name,
          options,
          indexOfMultiData,
          depthOfSchemaRefRecursion + 1
        );
      }
      // otherwise, generate data from property type
      if (data === undefined) {
        const statelessHashKey = `${name}-${key}-${depthOfSchemaRefRecursion}-${indexOfMultiData}`;
        data = this._generateDataFromPropertyType(
          property,
          stateless,
          options,
          depthOfSchemaRefRecursion,
          statelessHashKey
        );
      }
      element[key] = data;
    });
    return element;
  };

  _generateDataFromPropertyType = (
    property,
    stateless = false,
    options,
    depthOfSchemaRefRecursion,
    statelessHashKey = ''
  ) => {
    let value;
    switch (property.type) {
      case Type.STRING:
        value = generateStringTypeData(
          property,
          statelessHashKey,
          stateless,
          options
        );
        break;
      case Type.NUMBER:
        // create a random number
        value = generateNumberTypeData(property, statelessHashKey, stateless);
        break;
      case Type.INTEGER:
        // create a random number
        value = generateNumberTypeData(property, statelessHashKey, stateless);
        break;
      case Type.BOOLEAN:
        value = generateBooleanTypeData(statelessHashKey, stateless);
        break;
      case Type.ARRAY:
        value = generateArrayTypeData(
          this._schemas,
          property,
          stateless,
          options,
          depthOfSchemaRefRecursion,
          statelessHashKey,
          this._generateDataFromTargetSchemaProperties,
          this._generateDataFromPropertyType
        );
        break;
      default:
        // otherwise; {}
        value = {};
    }

    return value;
  };
}