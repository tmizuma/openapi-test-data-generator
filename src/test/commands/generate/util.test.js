import { jest } from "@jest/globals";
import {
  createRandomNumberByRange,
  createRandomStringByRange,
} from "../../../commands/generate/util";

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
});
