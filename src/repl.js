import {one} from "./one.js";

import readline from 'readline';
import {buildChatJson} from "./build-chat-json.js";
import {postMessages} from "./post-messages.js";
import {logFull} from "./util.js";

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

    const chat = await buildChatJson({userMessage});
    const response = await postMessages(chat);
    // console.log(response);

    if (response) {
      one.theChat.messages.push({
        role: "assistant",
        content: response
      });
    }
  }

  rl.close();
}
