/** @jsxImportSource solid-js */

import { createSignal, type Accessor, createEffect } from "solid-js";
import { type FrameWork } from "./CodeBlock";
import { codeToHtml } from "shiki";

const reactCode = `import ReactLastFMViewer from "@lastfm-viewer/react";

function App() {
    return (
        <>
            <ReactLastFMViewer
                user="[username]"
                updateInterval={20000} //20 seconds
            />
        </>
    );
}`;

const solidCode = `import SolidLastFMViewer from "@lastfm-viewer/solid";

function App() {
    return (
        <>
            <SolidLastFMViewer
                user="[username]"
                updateInterval={20000} //20 seconds
            />
        </>
    );
}`;

const svelteCode = `<script>
    import SvelteLastFmViewer from "@lastfm-viewer/svelte/SvelteLastFMViewer.svelte";
</script>

<SvelteLastFmViewer
    user="[username]"
    updateInterval={20000} {/* 20 seconds */}
/>`;

const defaultCode = reactCode;

const ComponentCode = (props: { selectedFW: Accessor<FrameWork> }) => {
	const [code, setCode] = createSignal<string>(reactCode);
	const [codeHtml, setCodeHtml] = createSignal<string>("");

	const renderCode = async () => {
		const codeString = await codeToHtml(code(), {
			lang: props.selectedFW() == "svelte" ? "svelte" : "tsx",
			theme: "min-dark",
			colorReplacements: {
				"min-dark": {
					"#121212": "transparent",
				},
			},
		});
		setCodeHtml(codeString);
	};

	renderCode();

	createEffect(() => {
		renderCode();
		setCode(
			props.selectedFW() == "react"
				? reactCode
				: props.selectedFW() == "solid"
				? solidCode
				: props.selectedFW() == "svelte"
				? svelteCode
				: ""
		);
	});
	return (
		<div
			class=" text-start px-8 py-4 ring-2 ring-white/10 bg-gradient-to-b from-gray-700/50 to-gray-900/50 rounded-lg mt-4 [&>pre]:overflow-auto **:overflow-x-auto"
			innerHTML={codeHtml()}
		></div>
	);
};

export default ComponentCode;
