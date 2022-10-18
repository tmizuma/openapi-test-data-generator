import { createRandomNumberByRange, createRandomStringByRange, getRandomYmd, getRandomYmdhhmmss } from "./util.js";

export const createSampleDataJson = (schemas, name, options) => {
  const schema = schemas[name];
  const numberOfArray = options.n;
  const properties = schema.properties;
  const result = [];
  if (schema.$ref) {
    const property = schema.$ref.replace("#/components/schemas/", "");
    const result = createSampleDataJson(schemas, property, options);
    return result;
  }
  for (let i = 0; i < numberOfArray; i++) {
    const element = {};
    Object.keys(properties).forEach((key) => {
      const property = properties[key];
      let value;
      if (property.enum && property.enum.length > 0) {
        const i = Math.floor(Math.random() * property.enum.length)
        value = `${property.enum[i]}`;
      }
      value = property.example ? property.example : value;
      if (property.$ref) {
        value = createSampleDataJson(
          schemas,
          property.$ref.replace("#/components/schemas/", ""), {...options, n: 1 }
        )[0];
      }
      if (value === undefined) {
        switch (property.type) {
          case "string":
            if (property.format === "date-time") {
              // create a random date-time data
              value = getRandomYmdhhmmss("2000/01/01");
            } else if (property.format === "date") {
              // create a random date data
              value = getRandomYmd("2000/01/01");
            } else {
              value = createRandomStringByRange(property.minLength, property.maxLength)
            }
            break;
          case "number":
            // create a random number
            value = createRandomNumberByRange(property.minimum, property.maximum);
            break;
          case "integer":
            // create a random number
            value = createRandomNumberByRange(property.minimum, property.maximum);
            break;
          case "array":
            // create a empty array
            value = [];
            break;
          case "boolean":
            value = Math.random() > 1 / 2;
            break;
          default:
            // otherwise; {}
            value = {};
        }
      }
      element[key] = value;
    });
    result.push(element);
  }
  return result;
};