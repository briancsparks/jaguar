import Anthropic from "@anthropic-ai/sdk";
import { safeJSONLoad } from './src/util.js';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

async function main() {
  // Read and parse the message configuration from the JSON file
  const config = await safeJSONLoad('message_config.json');
  
  if (!config) {
    throw new Error('Failed to load or parse message_config.json');
  }

  // Add streaming option to the configuration
  config.stream = true;

  // Create the message stream using the configuration from the JSON file
  const stream = await anthropic.messages.create(config);

  // Iterate over the stream
  for await (const chunk of stream) {
    if (chunk.type === 'content_block_delta') {
      process.stdout.write(chunk.delta.text);
    }
  }
}

main().catch(error => console.error('An error occurred:', error));
