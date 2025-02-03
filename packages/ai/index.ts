import { openai } from "./provider/openai";

export * from "ai";
export * from "./lib";

export const textModel = openai("gpt-4o");
