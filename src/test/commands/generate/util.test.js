import { jest } from "@jest/globals";
import {
  createRandomNumberByRange,
  createRandomNumberByMaxValueStateless,
  createRandomStringByRange,
  createRandomStringByMaxLengtheStateless,
  getRandomYmdStateless,
  getRandomYmdhhmmssStateless,
} from "../../../commands/generate/utils";

jest.mock("fs");

describe("util", () => {
  test("createRandomStringByRange", async () => {
    expect(createRandomStringByRange(1, 2).length).toBeLessThanOrEqual(2);
    expect(
      createRandomStringByRange(undefined, undefined).length
    ).toBeGreaterThanOrEqual(0);
    expect(() => createRandomStringByRange(-1, -2)).toThrow(Error);
    expect(() => createRandomStringByRange(10, 1)).toThrow(Error);
  });

  test("createRandomNumberByRange", async () => {
    expect(createRandomNumberByRange(1, 2)).toBeLessThanOrEqual(2);
    expect(
      createRandomNumberByRange(undefined, undefined)
    ).toBeGreaterThanOrEqual(0);
    expect(() => createRandomNumberByRange(-1, -2)).toThrow(Error);
    expect(() => createRandomNumberByRange(10, 1)).toThrow(Error);
  });

  test("createRandomStringByMaxLengtheStateless", async () => {
    const maxLength = 32;
    expect(createRandomStringByMaxLengtheStateless("key1", 10)).toBe(
      "c2add694bf"
    );
    expect(
      createRandomStringByMaxLengtheStateless("key1", maxLength).length
    ).toBe(maxLength);
  });

  test("createRandomNumberByMaxValueStateless", async () => {
    expect(
      createRandomNumberByMaxValueStateless("EmployeeId_001", 10, 100)
    ).toBe(91);
  });

  test("getRandomYmdStateless", async () => {
    expect(getRandomYmdStateless("2000/01/01", "hashedkey")).toBe("2011-01-15");
  });

  test("getRandomYmdhhmmssStateless", async () => {
    expect(getRandomYmdhhmmssStateless("2000/01/01", "hashedkey")).toBe(
      "2011-01-15 08:08:08"
    );
  });
});
