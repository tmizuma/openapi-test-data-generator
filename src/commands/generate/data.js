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
} from "./util.js";

export const createSampleDataJson = (schemas, name, options) => {
  const schema = schemas[name];
  const stateless = options.stateless;
  const parentIndex = options.parentIndex;
  const numberOfArray = options.n;
  const properties = schema.properties;
  const result = [];
  if (schema.$ref) {
    const property = schema.$ref.replace("#/components/schemas/", "");
    const result = createSampleDataJson(schemas, property, {
      ...options,
      parentIndex: i,
    });
    return result;
  }
  for (let i = 0; i < numberOfArray; i++) {
    const element = {};
    Object.keys(properties).forEach((key) => {
      const property = properties[key];
      const statelessHashKey = `${name}-${key}-${i}-${parentIndex}`;
      let value;
      if (property.enum && property.enum.length > 0) {
        value = `${property.enum[i % property.enum.length]}`;
      }
      value = property.example ? `${property.example}_${i}` : value;
      if (property.$ref) {
        value = createSampleDataJson(
          schemas,
          property.$ref.replace("#/components/schemas/", ""),
          { ...options, n: 1, parentIndex: i }
        )[0];
      }
      if (value === undefined) {
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
                : createRandomStringByRange(
                    property.minLength,
                    property.maxLength
                  );
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
      }
      element[key] = value;
    });
    result.push(element);
  }
  return result;
};
