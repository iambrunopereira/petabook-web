import { generateText, promptListProductNames, textModel } from "@repo/ai";
import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { z } from "zod";
import { authMiddleware } from "../middleware/auth";

export const aiRouter = new Hono().get(
	"/ai/generate-product-names",
	authMiddleware,
	validator("query", z.object({ topic: z.string() })),
	describeRoute({
		tags: ["AI"],
		summary: "Generate product names",
		description: "Generates a list of product names based on a topic",
		responses: {
			200: {
				description: "List of product names",
			},
		},
	}),
	async (c) => {
		const { topic } = c.req.valid("query");

		const response = await generateText({
			model: textModel,
			messages: [
				{
					role: "user",
					content: promptListProductNames(topic),
				},
			],
		});

		const ideas = (response.text ?? "")
			.split("\n")
			.filter((name) => name.length > 0);

		return c.json(ideas);
	},
);
