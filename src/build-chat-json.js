import {one} from "./one.js";

const chat0 = {
  model: "claude-3-5-sonnet-20241022",
  max_tokens: 2048,
  messages: []
};

one.theChat = chat0;


export async function buildChatJson(input) {
  let chat = {...one.theChat};

  const {userMessage, assistantMessage, systemMessage, ...rest} = input;

  if (userMessage) {
    chat.messages.push({
      role: "user",
      content: userMessage
    });
  }

  if (assistantMessage) {
    chat.messages.push({
      role: "assistant",
      content: assistantMessage
    });
  }

  if (systemMessage) {
    chat.messages.push({
      role: "system",
      content: systemMessage
    });
  }

  one.theChat = chat;

  return chat;
}




