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

  // Add streaming option to the configuration
  config.stream = true;

  try {
    // Create the message stream using the configuration from the JSON file
    const stream = await anthropic.messages.create(config);

    // Iterate over the stream
    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta') {
        process.stdout.write(chunk.delta.text);
      }
    }
  } catch (error) {
    console.error('An error occurred during streaming:', error);
  }
}

main();
