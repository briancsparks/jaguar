import Anthropic from "@anthropic-ai/sdk";
import { safeJSONLoad } from './src/util.js';
import readline from 'readline';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function promptUser(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  // Read and parse the message configuration from the JSON file
  const config = await safeJSONLoad('message_config.json');
  
  if (!config) {
    throw new Error('Failed to load or parse message_config.json');
  }

  let messages = config.messages || [];

  while (true) {
    const userMessage = await promptUser("> ");
    
    if (['exit', 'q', 'quit'].includes(userMessage.toLowerCase())) {
      break;
    }

    messages.push({ role: "user", content: userMessage });

    const stream = await anthropic.messages.create({
      model: config.model,
      max_tokens: config.max_tokens,
      messages: messages,
      stream: true,
    });

    let assistantResponse = "";
    process.stdout.write("Assistant: ");

    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta') {
        process.stdout.write(chunk.delta.text);
        assistantResponse += chunk.delta.text;
      }
    }

    console.log("\n");
    messages.push({ role: "assistant", content: assistantResponse });
  }

  rl.close();
}

main().catch(error => console.error('An error occurred:', error));
