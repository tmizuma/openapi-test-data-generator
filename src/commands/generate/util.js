import { DEFAULT_MAX_RANDOM_VALUE } from "./const.js";

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
 * create random number which is between min and max
 * 
 * @param {number} min 
 * @param {number} max 
 * @returns {number} result
 */
export const createRandomNumberByRange = (min, max) => {
  if (min < 0 || max < 0 || min >= max) {
    throw new Error()
  }
  const minimum = min ? min : 0
  const maximum = max ? max : DEFAULT_MAX_RANDOM_VALUE
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
}

/**
 * create random string whose length is between min and max
 * 
 * @param {number} min 
 * @param {number} max 
 * @returns {string} result
 */
export const createRandomStringByRange = (min, max) => {
  if (min < 0 || max < 0 || min >= max) {
    throw new Error()
  }
  const minimum = min ? min : 0
  const maximum = max ? max : 10
  const len = createRandomNumberByRange(minimum, maximum)
  return [...Array(Math.ceil(len / 9))].map(() => Math.random().toString(36).split('.')[1]).join('').slice(-len)
}