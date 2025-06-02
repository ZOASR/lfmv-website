/** @type {import('tailwindcss').Config}, */

export default {
	theme: {
		extend: {
			colors: {
				react: "#61dafb",
				solid: "#2c4f7c",
				svelte: "#ff3e00",
			},
		},
	},

	presets: [require("@lastfm-viewer/tailwind-config")],
};
