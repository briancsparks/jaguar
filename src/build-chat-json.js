// import {the} from "./the.js";

// the.theChat = {
//   model: "claude-3-5-sonnet-20241022",
//   max_tokens: 2048,
//   messages: []
// };

// import developerPrompt from "./prompts/system/developer.js";


// export async function buildChatJson(input) {
//   let chat = {...the.theChat};
//
//   const {userMessage, assistantMessage, ...rest} = input;
//   let systemMessage = developerPrompt();
//
//   if (systemMessage) {
//     chat.messages.push({
//       role: "system",
//       content: systemMessage
//     });
//   }
//
//   if (assistantMessage) {
//     chat.messages.push({
//       role: "assistant",
//       content: assistantMessage
//     });
//   }
//
//   if (userMessage) {
//     chat.messages.push({
//       role: "user",
//       content: userMessage
//     });
//   }
//
//   the.theChat = chat;
//
//   return chat;
// }




