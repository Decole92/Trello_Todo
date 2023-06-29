import { NextResponse } from "next/server";
import Openai from "../../../../openai";

export async function POST(request: Request) {
  const { todos } = await request.json();
  const res = await Openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content: `when response, welcome the user,
         as always as Mr. decole,
        and say Welcome to your Friendly Todo App limit the response to 200 character.`,
      },
      {
        role: "user",
        content: `Hi there, provide a summary of the following todos, Count how may todos are in each category such as Todo, in progress and done, then contribute opinion on how to  tackle, proceed or complete this todos after then tell the user have a productive day!, Here's the data: ${JSON.stringify(
          todos
        )} `,
      },
    ],
  });
  const { data } = res;
  return NextResponse.json(data.choices[0].message);
}
