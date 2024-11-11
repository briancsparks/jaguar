import {the} from "./the.js";

const chat0 = {
  model: "claude-3-5-sonnet-20241022",
  max_tokens: 2048,
  messages: []
};

the.currChat = {
  system: null,
  messages: []
};

import readline from 'readline';
import {postMessages} from "./post-messages.js";
import {logFull} from "./util.js";
import {systemPrompt} from "./prompts";

/**
 * The readline interface for reading data from the standard input.
 * This interface is used to create a line-by-line input stream from the
 * standard input (stdin) and output stream (stdout) of the process.
 *
 * The `input` option specifies the readable stream to listen to for input.
 * The `output` option specifies the writable stream to write data to.
 *
 * Configured with `process.stdin` for input to allow reading from the
 * terminal, and `process.stdout` for output to enable writing responses.
 *
 * Primarily used for receiving user input in a command-line application.
 */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Prompts the user with a given question and returns their input.
 *
 * @param {string} question - The question to present to the user.
 * @return {Promise<string>} A promise that resolves with the user's answer.
 */
function promptUser(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}



/**
 * Continuously prompts the user for input, processes each message, and handles communication with the chat service.
 *
 * Repeatedly accepts user input until the user enters a message intended to terminate the loop ('exit', 'q', 'quit').
 * Each user message is sent to a chat service and the response is appended to the chat messages.
 * The method will close the readline interface upon termination.
 *
 * @return {Promise<void>} A promise that resolves when the REPL loop is terminated and resources are cleaned up.
 */
export async function repl() {

  while (true) {
    const userMessage = await promptUser("> ");

    if (['exit', 'q', 'quit'].includes(userMessage.toLowerCase())) {
      break;
    }

    const chat = await buildChatJson(userMessage);
    const response = await postMessages(chat);
    // console.log(response);

    if (response) {
      the.currChat.messages.push({
        role: "assistant",
        content: response
      });
    }
  }

  return rl.close();

  // ---------------------------------------------------------------------------------

  /**
   * Constructs a chat JSON object by combining a predefined chat template with user messages.
   *
   * More specifically, takes the `the.currChat` object, which holds the data for the current
   * chat (but is in a more friendly "keyed" format - not a bunch of arrays), and takes the
   * input `userMessage` and outputs the right object to send to the AI's JSON API.
   *
   * @param {string} userMessage - The message provided by the user to be added to the chat.
   * @return {Object} The constructed chat object with the updated messages.
   */
  async function buildChatJson(userMessage) {
    const curr = the.currChat;

    // TODO: you have userMessage, and the current state of the chat (in 'ideal' format) - allow photons

    curr.messages.push({
      role: "user",
      content: userMessage
    });

    // TODO: you have userMessage, and the current state of the chat (in 'ideal' format) - allow photons

    let chat = {...chat0};

    // System prompt?
    if (curr.system) {
      chat.messages.push({
        role: "system",
        content: curr.system
      });
    }

    chat.messages = [...chat.messages, ...curr.messages];

    return chat;
  }
}

