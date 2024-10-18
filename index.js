import Anthropic from "@anthropic-ai/sdk";
import fs from 'fs/promises';
import { safeJSONParse } from './src/util.js';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

async function main() {
  // Read the message configuration from the JSON file
  const configFile = await fs.readFile('message_config.json', 'utf8');
  const config = safeJSONParse(configFile);

  // Create the message using the configuration from the JSON file
  const msg = await anthropic.messages.create(config);

  console.log(msg);
}

main().catch(error => console.error('An error occurred:', error));
