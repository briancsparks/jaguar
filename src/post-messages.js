import {one} from "./one.js";
import Anthropic from "@anthropic-ai/sdk";
import chalk from "chalk";
import {logFull} from "./util.js";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

export async function postMessages(chat) {

  const stream = await anthropic.messages.create({...chat, stream: true});


  let response = "";
  let input_tokens = 0;
  let output_tokens = 0;

  process.stdout.write(chalk.blue("Assistant: "));
  for await (const chunk of stream) {

    if (chunk.type === 'message_start') {
      input_tokens += chunk?.message?.usage?.input_tokens || 0;
      output_tokens += chunk?.message?.usage?.output_tokens || 0;

    } else if (chunk.type === 'content_block_start') {
      response = chunk?.content_block?.text || '';

    } else if (chunk.type === 'content_block_delta') {
      // process.stdout.write(chalk.blue('\n\n------------------------------------------------------------------\n'));
      process.stdout.write(chalk.blue(chunk.delta.text));
      // process.stdout.write(chalk.blue('\n------------------------------------------------------------------\n'));
      response += chunk.delta.text;

    } else if (chunk.type === 'content_block_stop') {

    } else if (chunk.type === 'message_delta') {
      output_tokens += chunk?.usage?.output_tokens || 0;


    } else if (chunk.type === 'message_stop') {

    } else {
      process.stdout.write(chalk.red("\n\nUnknown chunk type: " + chunk.type));
      logFull({chunk});
    }
  }
  process.stdout.write(chalk.reset("\n"));

  return response;
}
