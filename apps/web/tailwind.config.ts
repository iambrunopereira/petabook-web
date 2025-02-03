import baseConfig from "@repo/tailwind-config";
import { createPreset } from "fumadocs-ui/tailwind-plugin";
import type { Config } from "tailwindcss";

export default {
	presets: [createPreset({}), baseConfig],
	content: [
		"./app/**/*.tsx",
		"./modules/**/*.tsx",
		"./content/**/*.mdx",
		"./node_modules/fumadocs-ui/dist/**/*.js",
	],
	safelist: ["ml-2", "ml-4", "ml-6", "ml-8", "ml-10"],
} satisfies Config;
