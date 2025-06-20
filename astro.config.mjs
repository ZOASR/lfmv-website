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
		react({
			include: ["src/components/ui/*", "src/components/React/*"],
		}),
		solidJs({
			include: ["src/components/Solid/*"],
		}),
		icon({
			include: {
				lucide: ["*"],
			},
		}),
	],

	output: "server",
	site: "https://lastfm-viewer.vercel.app",

	vite: {
		plugins: [tailwindcss()],
		ssr: {
			noExternal: ["@iconify/svelte"],
		},
	},

	adapter: vercel(),
});
