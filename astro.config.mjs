import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import svelte from "@astrojs/svelte";

import react from "@astrojs/react";
import icon from "astro-icon";

import solidJs from "@astrojs/solid-js";

import vercel from "@astrojs/vercel";

export default defineConfig({
	integrations: [
		svelte(),
		react(),
		solidJs(),
		icon({
			include: {
				lucide: ["*"],
			},
		}),
		,
	],

	output: "server",
	site: "https://lastfm-viewer.vercel.app",

	vite: {
		plugins: [tailwindcss()],
	},

	adapter: vercel(),
});
