import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";
import react from "@astrojs/react";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
	site: "https://lastfm-viewer.vercel.app/",
	integrations: [
		svelte(),
		tailwind({
			nesting: true,
		}),
		solidJs({
			include: ["**/Solid/*"],
		}),
		react({
			include: ["**/React/*"],
		}),
	],
	output: "server",
	adapter: vercel(),
});
