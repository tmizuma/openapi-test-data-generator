import { getRandomYmd, getRandomYmdhhmmss } from "./util.js";

export const createSampleDataJson = (schemas, name) => {
  const schema = schemas[name];

  const properties = schema.properties;
  const result = {};
  if (schema.$ref) {
    const property = schema.$ref.replace("#/components/schemas/", "");
    const result = createSampleDataJson(schemas, property);
    return result;
  }
  Object.keys(properties).forEach((key) => {
    const property = properties[key];
    let value
    if (property.enum && property.enum.length > 0) {
      value = `${property.enum[0]}`;
    }
    value = property.example ? property.example : value;
    if (property.$ref) {
      value = createSampleDataJson(
        schemas,
        property.$ref.replace("#/components/schemas/", "")
      );
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
            value = Math.random().toString(32).substring(2);
          }
          break;
        case "number":
          // create a random number
          value = Math.round(Math.random() * 1000000);
          break;
        case "integer":
          value = Math.round(Math.random() * 1000000);
          break;
        case "array":
          // create a empty array
          value = [];
          break;
        case "boolean":
          // always true when type is boolean
          value = true;
          break;
        default:
          // otherwise; {}
          value = {};
      }
    }
    result[key] = value;
  });
  return result;
};