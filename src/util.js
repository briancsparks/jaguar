import fs from 'fs/promises';
import * as util from "node:util";


export function safeJSONParse(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return undefined;
  }
}

export async function safeJSONLoad(filename) {
  try {
    const fileContent = await fs.readFile(filename, 'utf8');
    return safeJSONParse(fileContent);
  } catch (error) {
    console.error(`Error reading or parsing file ${filename}:`, error);
    return undefined;
  }
}

export function logFull(obj) {
  console.log(util.inspect(obj, {
    depth: null,
    colors: true,
    maxArrayLength: null
  }));
}
