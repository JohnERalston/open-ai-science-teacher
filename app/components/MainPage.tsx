"use client";

import React, { useState } from "react";
import { answerQuestionServer, askQuestionServer } from "./askQuestionServer";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export const MainPage = () => {
  const [chat, setChat] = useState<ChatCompletionMessageParam[]>([]);
  //   const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function askQuestion() {
    setChat([]);
    setAnswer("");
    const resp = await askQuestionServer();
    const chatCopy = [] as ChatCompletionMessageParam[];
    chatCopy.push({ role: "user", content: resp! });
    setChat(chatCopy);

    // setQuestion(resp || "Woops something went wrong!");
  }

  async function answerQuestion() {
    const chatCopy = chat.slice();
    chatCopy.push({ role: "user", content: answer });
    setAnswer("");
    const resp = await answerQuestionServer(chatCopy);
    chatCopy.push({ role: "assistant", content: resp });
    setChat(chatCopy);
  }

  return (
    <>
      <div className="hero bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">
              I'm a science teacher. I'm going to ask you some questions and
              grade your answers
            </p>
            <button className="btn btn-secondary" onClick={askQuestion}>
              New Question
            </button>
          </div>
        </div>
      </div>

      <div>
        <div className="my-5">
          {chat.map((elem, i) => (
            <>
              {i === 0 && <h1 className="size-5 bold">Question</h1>}
              <div className="shadow-xl p-5">{elem.content?.toString()}</div>
            </>
          ))}
        </div>

        {chat.length > 0 && (
          <>
            <h3 className="mt-5">Your answer</h3>
            <textarea
              className="textarea textarea-bordered w-full py-5"
              placeholder=""
              onChange={(e) => setAnswer(e.target.value)}
              value={answer}
            ></textarea>
            <button
              className="btn btn-secondary w-full"
              onClick={answerQuestion}
            >
              Answer
            </button>
          </>
        )}
      </div>
    </>
  );
};
