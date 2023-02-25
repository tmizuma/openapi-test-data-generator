import axios from 'axios';
import { Logger } from '../logger/index.js';

export const fetch = async(apiKey, propertyName, n) => {
  const endpoint = 'https://api.openai.com/v1/completions';
  const params = {
    prompt: `Given the article below, create a ${n} sample string value which property value is ${propertyName}. The result should be in this format: [ "sample string 1", "sample strint 2" ]`,
    model: 'text-davinci-003',
    max_tokens: 1000,
    temperature: 0
  };
  // Define the headers for the request
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`
  };

  const result = await axios.post(endpoint, params, { headers });

  try {
    const formattedResult = JSON.parse(result.data.choices[0].text);
    return formattedResult;
  } catch (e) {
    Logger.error(
      `Failed to generate data with "${propertyName}". Please ignore this property with --ignore-ai-generate ${propertyName}`
    );
    exit(1);
  }
};

// for test
// console.log(
//   await fetch('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', 'id', 3)
// );
// console.log(
//   await fetch('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', 'name', 1)
// );
// console.log(
//   await fetch('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', 'hobby', 3)
// );