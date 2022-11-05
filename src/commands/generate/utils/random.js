import md5 from "md5";
import { DEFAULT_MAX_RANDOM_VALUE, MAX_DAY_DIFF } from "../const/index.js";

const createRandomByRangeAndSeed = (seed, min, max) => {
  if (min < 0 || max < 0 || min >= max) {
    throw new Error();
  }
  const randomlySeed = Math.pow(seed, 5);
  const random = new Random(randomlySeed);
  return random.nextInt(min, max);
};

export const getRandomYmdStateless = (fromYmd, key) => {
  const d1 = new Date(fromYmd);
  const diffDateTime =
    createRandomNumberByMaxValueStateless(key, 0, MAX_DAY_DIFF) *
    24 *
    3600 *
    1000;
  const d2 = new Date(d1.getTime() + diffDateTime);

  const y = d2.getFullYear();
  const m = ("00" + (d2.getMonth() + 1)).slice(-2);
  const d = ("00" + d2.getDate()).slice(-2);
  return `${y}-${m}-${d}`;
};

export const getRandomYmdhhmmssStateless = (fromYmd, key) => {
  const d1 = new Date(getRandomYmdStateless(fromYmd, key));

  const y = d1.getFullYear();
  const m = ("00" + (d1.getMonth() + 1)).slice(-2);
  const d = ("00" + d1.getDate()).slice(-2);
  const hh = ("00" + createRandomNumberByMaxValueStateless(key, 0, 23)).slice(-2);
  const mm = ("00" + createRandomNumberByMaxValueStateless(key, 0, 59)).slice(-2);
  const ss = ("00" + createRandomNumberByMaxValueStateless(key, 0, 59)).slice(-2);
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
};

export const getRandomYmd = (fromYmd) => {
  const d1 = new Date(fromYmd);
  const d2 = new Date();

  const c = (d2 - d1) / 86400000;
  const x = Math.floor(Math.random() * (c + 1));

  d1.setDate(d1.getDate() + x);

  const y = d1.getFullYear();
  const m = ("00" + (d1.getMonth() + 1)).slice(-2);
  const d = ("00" + d1.getDate()).slice(-2);
  return `${y}-${m}-${d}`;
};

export const getRandomYmdhhmmss = (fromYmd) => {
  const d1 = new Date(fromYmd);
  const d2 = new Date();

  const c = (d2 - d1) / 86400000;
  const x = Math.floor(Math.random() * (c + 1));

  d1.setDate(d1.getDate() + x);

  const y = d1.getFullYear();
  const m = ("00" + (d1.getMonth() + 1)).slice(-2);
  const d = ("00" + d1.getDate()).slice(-2);
  const hh = ("00" + Math.round(Math.random() * 24)).slice(-2);
  const mm = ("00" + Math.round(Math.random() * 60)).slice(-2);
  const ss = ("00" + Math.round(Math.random() * 60)).slice(-2);
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
};

/**
 * create random number whose size is between min and max
 *
 * @param {number} min
 * @param {number} max
 * @returns {number} result
 */
export const createRandomNumberByRange = (min, max) => {
  if (min < 0 || max < 0 || min >= max) {
    throw new Error();
  }
  const minimum = min ? min : 0;
  const maximum = max ? max : DEFAULT_MAX_RANDOM_VALUE;
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
};

/**
 * create random string whose length is between min and max
 *
 * @param {number} min
 * @param {number} max
 * @returns {string} result
 */
export const createRandomStringByRange = (min, max) => {
  if (min < 0 || max < 0 || min >= max) {
    throw new Error();
  }
  const minimum = min ? min : 0;
  const maximum = max ? max : 10;
  const len = createRandomNumberByRange(minimum, maximum);
  return [...Array(Math.ceil(len / 9))]
    .map(() => Math.random().toString(36).split(".")[1])
    .join("")
    .slice(-len);
};

/**
 * create stateless random string whose length is between min with key, and with stateless key string
 *
 * @param {string} key
 * @param {number} maxLength
 * @returns {string} result
 */
export const createRandomStringByMaxLengtheStateless = (key, maxLength) => {
  const max = maxLength ? maxLength : 10;
  return md5(key).substring(0, max);
};

/**
 * create stateless random number whose size is between min with max, and with stateless key string
 *
 * @param {string} key
 * @param {number} minValue
 * @param {number} maxValue
 * @returns {string} result
 */
export const createRandomNumberByMaxValueStateless = (
  key,
  minValue,
  maxValue
) => {
  const maximum = maxValue ? maxValue : 10;
  const minimum = minValue ? minValue : 0;
  if (minValue < 0 || maxValue < 0 || minimum >= maximum) {
    throw new Error();
  }
  const hashedKey = md5(key);
  let seed = 0;
  for (let i = 0; i < hashedKey.length; i++) {
    seed = seed + hashedKey.charCodeAt(i);
  }
  return createRandomByRangeAndSeed(seed, minimum, maximum);
};

export const createRandomBooleanStateless = (key) => {
  return createRandomNumberByMaxValueStateless(key, 0, 10) % 2 === 0;
};

class Random {
  constructor(seed = 88675123) {
    this.x = 123456789;
    this.y = 362436069;
    this.z = 521288629;
    this.w = seed;
  }

  next() {
    let t;

    t = this.x ^ (this.x << 11);
    this.x = this.y;
    this.y = this.z;
    this.z = this.w;
    return (this.w = this.w ^ (this.w >>> 19) ^ (t ^ (t >>> 8)));
  }

  nextInt(min, max) {
    const r = Math.abs(this.next());
    return min + (r % (max + 1 - min));
  }
}