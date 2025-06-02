import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import svelte from "@astrojs/svelte";

import react from "@astrojs/react";
import icon from "astro-icon";

import solidJs from "@astrojs/solid-js";

export default defineConfig({
    integrations: [svelte(), react(), icon({
        include: {
            lucide: ["*"],
        },
		}), solidJs()],
    output: "static",
    site: "https://lastfm-viewer.vercel.app",
    vite: {
        plugins: [tailwindcss()],
    },
});