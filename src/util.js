import fs from 'fs/promises';

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
