import {
  createRandomNumberByRange,
  createRandomNumberByMaxValueStateless,
  createRandomStringByRange,
  getRandomYmd,
  getRandomYmdhhmmss,
  createRandomStringByMaxLengtheStateless,
  createRandomBooleanStateless,
  getRandomYmdStateless,
  getRandomYmdhhmmssStateless,
} from "../utils/index.js";

/**
 * Create schema sample data
 * @param {*} schemas
 * @param {*} name
 * @param {*} options
 * @returns {Array<object>} sample data
 */
export const createSampleDataJson = (schemas, name, options) => {
  const schema = schemas[name];
  const stateless = options.stateless;
  const depthOfRecursion = options.depthOfRecursion
    ? options.depthOfRecursion
    : 0;
  const numberOfArray = options.n;
  const properties = schema.properties;
  const result = [];

  if (schema.$ref) {
    const property = schema.$ref.replace("#/components/schemas/", "");
    const result = createSampleDataJson(schemas, property, {
      ...options,
      depthOfRecursion: depthOfRecursion + 1,
    });
    return result;
  }

  for (let i = 0; i < numberOfArray; i++) {
    // create sample data for a specified number of pieces.
    const element = {};
    Object.keys(properties).forEach((key) => {
      const property = properties[key];
      let sampleData;

      // enum type
      if (property.enum && property.enum.length > 0) {
        sampleData = `${property.enum[i % property.enum.length]}`;
      }

      // if exists example data
      sampleData = property.example ? `${property.example}_${i}` : sampleData;

      // create sample data recursively if the property type is $ref.
      if (property.$ref) {
        sampleData = createSampleDataJson(
          schemas,
          property.$ref.replace("#/components/schemas/", ""),
          { ...options, n: 1, depthOfRecursion: depthOfRecursion + 1 }
        )[0];
      }

      // otherwise, create sample data from property attributes
      if (sampleData === undefined) {
        const statelessHashKey = `${name}-${key}-${depthOfRecursion}-${i}`;
        sampleData = createSampleDataFromPropertyAttributes(
          property,
          stateless,
          statelessHashKey
        );
      }
      element[key] = sampleData;
    });
    result.push(element);
  }
  return result;
};

const createSampleDataFromPropertyAttributes = (
  property,
  stateless = false,
  statelessHashKey = ""
) => {
  let value;
  switch (property.type) {
    case "string":
      if (property.format === "date-time") {
        // create a random date-time data
        value = stateless
          ? getRandomYmdhhmmssStateless("2000/01/01", statelessHashKey)
          : getRandomYmdhhmmss("2000/01/01");
      } else if (property.format === "date") {
        // create a random date data
        value = stateless
          ? getRandomYmdStateless("2000/01/01", statelessHashKey)
          : getRandomYmd("2000/01/01");
      } else {
        value = stateless
          ? createRandomStringByMaxLengtheStateless(
              statelessHashKey,
              property.maxLength
            )
          : createRandomStringByRange(property.minLength, property.maxLength);
      }
      break;
    case "number" || "integer":
      // create a random number
      value = stateless
        ? createRandomNumberByMaxValueStateless(
            statelessHashKey,
            property.minimum,
            property.maximum
          )
        : createRandomNumberByRange(property.minimum, property.maximum);
      break;
    case "array":
      // create a empty array
      value = [];
      break;
    case "boolean":
      value = stateless
        ? createRandomBooleanStateless(statelessHashKey)
        : Math.random() > 1 / 2;
      break;
    default:
      // otherwise; {}
      value = {};
  }

  return value;
};
