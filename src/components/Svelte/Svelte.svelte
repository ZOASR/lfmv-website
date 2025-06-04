<script lang="ts">
	import SvelteLastFmViewer from "@lastfm-viewer/svelte/SvelteLastFMViewer";
	import "@lastfm-viewer/ui/styles";
	import "@lastfm-viewer/ui/styles/LastFMViewer.css";
	import "@lastfm-viewer/ui/styles/PastTracks.css";
	import "@lastfm-viewer/ui/styles/TrackProgressBar.css";
	import "@lastfm-viewer/ui/styles/CardFooter.css";
	import "@lastfm-viewer/ui/styles/ErrorView.css";
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
		api_key: urlParams.get("apiKey"),
		user: urlParams.get("username"),
		updateInterval: Number(urlParams.get("updateInterval")),
		mode: urlParams.get("mode") as Mode,
		changed: false,
	});

	window.addEventListener("querychanged", (e) => {
		const urlParams = new URLSearchParams(window.location.search);
		paramsStore.set({
			api_key: urlParams.get("apiKey"),
			user: urlParams.get("username"),
			updateInterval: Number(urlParams.get("updateInterval")),
			mode: urlParams.get("mode") as Mode,
			changed: true,
		});
		setTimeout(
			() =>
				paramsStore.set({
					api_key: urlParams.get("apiKey"),
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
	$: console.log(params);
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
	<p>Component will render here</p>
{/if}
