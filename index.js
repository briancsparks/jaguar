import {the} from "./src/the.js";

the.two = "Buckle my shoe";

import {buildChatJson} from "./src/build-chat-json.js";
import {repl} from "./src/repl.js";

// import Anthropic from "@anthropic-ai/sdk";
import { safeJSONLoad } from './src/util.js';
// import readline from 'readline';
import chalk from 'chalk';
//
// const anthropic = new Anthropic({
//   apiKey: process.env.ANTHROPIC_API_KEY
// });
//
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });
//
// function promptUser(question) {
//   return new Promise((resolve) => {
//     rl.question(question, (answer) => {
//       resolve(answer);
//     });
//   });
// }

async function main() {
  return repl();
}

async function mainX() {
  // Read and parse the message configuration from the JSON file
  const config = await safeJSONLoad('message_config.json');

  if (!config) {
    throw new Error('Failed to load or parse message_config.json');
  }

  let messages = config.messages || [];

  // while (true) {
    // const userMessage = await promptUser("> ");
    //
    // if (['exit', 'q', 'quit'].includes(userMessage.toLowerCase())) {
    //   break;
    // }
    //
    // messages.push({ role: "user", content: userMessage });

    // const stream = await anthropic.messages.create({
    //   model: config.model,
    //   max_tokens: config.max_tokens,
    //   messages: messages,
    //   stream: true,
    // });

    //
    // let assistantResponse = "";
    // process.stdout.write(chalk.blue("Assistant: "));
    //
    // for await (const chunk of stream) {
    //   if (chunk.type === 'content_block_delta') {
    //     process.stdout.write(chalk.blue(chunk.delta.text));
    //     assistantResponse += chunk.delta.text;
    //   }
    // }
    //
    // console.log(chalk.reset("\n"));
    // console.log(chalk.green(JSON.stringify({ role: "assistant", content: assistantResponse }, null, 2)));

    // messages.push({ role: "assistant", content: assistantResponse });
  // }

  // rl.close();
}

main().catch(error => console.error('An error occurred:', error));
