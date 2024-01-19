/** @jsxImportSource solid-js */

import {
	createEffect,
	createSignal,
} from "solid-js";
import { codeToHtml } from "shikiji";
import ComponentCode from "./ComponentCode";

export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";
export type FrameWork = "react" | "solid" | "svelte";

const colors = {
	react: "#61dafb",
	solid: "#2c4f7c",
	svelte: "#ff3e00",
	bun: "#fbf0df",
	npm: "#c90000",
	yarn: "#2b8ab5",
	pnpm: "#f9ad00",
};

const CodeBlock = () => {
	const [selectedPM, setSelectedPM] = createSignal<PackageManager>("npm");
	const [selectedFW, setSelectedFW] = createSignal<FrameWork>("react");
	const [installScript, setInstallScript] = createSignal<string>(
		`${selectedPM()} install @lastfm-viewer/${selectedFW()}`
	);

	createEffect(() => {
		const codeString = `${selectedPM()} ${selectedPM() == "yarn" || selectedPM() == "pnpm" ? "add" : "install"} @lastfm-viewer/${selectedFW()}`;
		codeToHtml(codeString, {
			lang: "bash",
			theme: "vitesse-dark",
		}).then((codeHtml) => {
			setInstallScript(codeHtml);
		});
	});
	const buttonStyle =
		"h-full w-full bg-inherit font-mono text-nowrap text-white py-4 text-center";
	return (
		<>
			<div class="sm:max-w-[570px] mx-auto max-w-[90dvw]">
				<div class="flex w-full gap-4 justify-between bg-[#121212] ring-2 ring-white/10 h-max m-0 rounded-lg overflow-auto">
					<div class="w-[40%] text-base flex justify-between divide-y-0 divide-x-2 divide-white/10 divide-solid">
						<button
							style={{
								background:
									selectedFW() == "react"
										? colors[selectedFW()]
										: "inherit",
								color:
									selectedFW() == "react" ? "black" : "white",
							}}
							class={buttonStyle}
							onclick={() => setSelectedFW("react")}
						>
							react
						</button>
						<button
							style={{
								background:
									selectedFW() == "solid"
										? colors[selectedFW()]
										: "inherit",
							}}
							class={buttonStyle}
							onclick={() => setSelectedFW("solid")}
						>
							solid-js
						</button>
						<button
							style={{
								background:
									selectedFW() == "svelte"
										? colors[selectedFW()]
										: "inherit",
							}}
							class={buttonStyle}
							onclick={() => {
								setSelectedFW("svelte");
							}}
						>
							svelte
						</button>
					</div>
					{/*  */}
					<div class="w-[40%] text-sm flex justify-between divide-y-0 divide-x-2  divide-white/10 divide-solid ">
						<button
							style={{
								background:
									selectedPM() == "npm"
										? colors[selectedPM()]
										: "inherit",
							}}
							class={buttonStyle}
							onclick={() => {
								setSelectedPM("npm");
							}}
						>
							npm
						</button>
						<button
							style={{
								background:
									selectedPM() == "pnpm"
										? colors[selectedPM()]
										: "inherit",
								color:
									selectedPM() == "pnpm" ? "black" : "white",
							}}
							class={buttonStyle}
							onclick={() => {
								setSelectedPM("pnpm");
							}}
						>
							pnpm
						</button>
						<button
							style={{
								background:
									selectedPM() == "yarn"
										? colors[selectedPM()]
										: "inherit",
							}}
							class={buttonStyle}
							onclick={() => {
								setSelectedPM("yarn");
							}}
						>
							yarn
						</button>
						<button
							style={{
								background:
									selectedPM() == "bun"
										? colors[selectedPM()]
										: "inherit",
								color:
									selectedPM() == "bun" ? "black" : "white",
							}}
							class={buttonStyle}
							onclick={() => {
								setSelectedPM("bun");
							}}
						>
							bun
						</button>
					</div>
				</div>
				<div
					innerHTML={installScript()}
					class=" *:w-full text-start px-8 py-4 ring-2 ring-white/10 bg-[#121212] rounded-lg mt-4 *:overflow-x-auto w-full"
				></div>
				<ComponentCode selectedFW={selectedFW} />
			</div>
		</>
	);
};

export default CodeBlock;
