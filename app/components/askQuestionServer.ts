"use server";

import OpenAI from "openai";
import {
  Completion,
  CompletionCreateParamsNonStreaming,
} from "openai/resources/completions.mjs";
import {
  ChatCompletionCreateParamsNonStreaming,
  ChatCompletionMessageParam,
} from "openai/resources/index.mjs";

const prompt = `You are a science teacher for ten year olds. 
  You will ask a random science question.
  You will not give introductions. You will simply ask the question. 
  You are not the student.
  Do not answer the question until you receive an answer.
  You will then accept an answer 
  and provide feedback on how correct the answer was. 
  Do not allow the topic to be changed and do not accept any questions. 
  Prompt to answer the question at hand if any attempt to deviate is detected.
  `;

export async function askQuestionServer() {
  const ai = new OpenAI();
  const completion = await ai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4",
  });

  return completion.choices[0].message.content;
}

export async function answerQuestionServer(
  context: ChatCompletionMessageParam[]
) {
  const ai = new OpenAI();
  const completion = await ai.chat.completions.create({
    messages: [{ role: "user", content: prompt }, ...context],
    model: "gpt-3.5-turbo",
  });
  // console.log({ c: [{ role: "user", content: prompt }, ...context] });
  const resp = completion.choices[0].message.content;
  // console.log({ resp });
  return resp;
}
