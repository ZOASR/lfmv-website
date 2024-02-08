<script lang="ts">
	import "@lastfm-viewer/ui";
	import SvelteLastFmViewer from "@lastfm-viewer/svelte/SvelteLastFMViewer";
	import { writable } from "svelte/store";

	type Mode = "dev" | "prod";

	type ComponentParams = {
		api_key: null | string;
		user: null | string;
		updateInterval: null | number;
		changed: boolean;
		mode: Mode;
	};

	const urlParams = new URLSearchParams(window.location.search);

	const paramsStore = writable<ComponentParams>({
		api_key: urlParams.get("api_key"),
		user: urlParams.get("username"),
		updateInterval: Number(urlParams.get("updateInterval")),
		mode: urlParams.get("mode") as Mode,
		changed: false,
	});

	window.addEventListener("querychanged", (e) => {
		const urlParams = new URLSearchParams(window.location.search);
		paramsStore.set({
			api_key: urlParams.get("api_key"),
			user: urlParams.get("username"),
			updateInterval: Number(urlParams.get("updateInterval")),
			mode: urlParams.get("mode") as Mode,
			changed: true,
		});
		setTimeout(
			() =>
				paramsStore.set({
					api_key: urlParams.get("api_key"),
					user: urlParams.get("username"),
					updateInterval: Number(urlParams.get("updateInterval")),
					mode: urlParams.get("mode") as Mode,
					changed: false,
				}),
			100
		);
	});

	let params: ComponentParams;
	paramsStore.subscribe((val) => {
		params = val;
	});
</script>

{#if params.user && params.api_key && !params.changed}
	<SvelteLastFmViewer
		api_key={params.api_key}
		user={params.user}
		updateInterval={params.updateInterval
			? params.updateInterval
			: undefined}
		mode={params.mode}
	/>
{:else}
	<div
		class="flex justify-center items-center text-4xl w-full h-full text-center"
	>
		<p class="bg-black/50 rounded-lg p-4 shadow-2xl ring-1 ring-black">
			Component will render here
		</p>
	</div>
{/if}
