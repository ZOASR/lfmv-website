<script lang="ts">
	import { SvelteLastFMViewer } from "@lastfm-viewer/svelte";
	import "@lastfm-viewer/ui/styles";
	import "@lastfm-viewer/ui/styles/LastFMViewer.css";
	import "@lastfm-viewer/ui/styles/PastTracks.css";
	import "@lastfm-viewer/ui/styles/TrackProgressBar.css";
	import "@lastfm-viewer/ui/styles/CardFooter.css";
	import "@lastfm-viewer/ui/styles/ErrorView.css";
	import { writable } from "svelte/store";

	type Mode = "dev" | "prod";

	type ComponentParams = {
		user: null | string;
		updateInterval: null | number;
		changed: boolean;
		mode: Mode;
	};

	const urlParams = new URLSearchParams(window.location.search);

	const paramsStore = writable<ComponentParams>({
		user: urlParams.get("username"),
		updateInterval: Number(urlParams.get("updateInterval")),
		mode: urlParams.get("mode") as Mode,
		changed: false,
	});

	window.addEventListener("querychanged", (e) => {
		const urlParams = new URLSearchParams(window.location.search);
		paramsStore.set({
			user: urlParams.get("username"),
			updateInterval: Number(urlParams.get("updateInterval")),
			mode: urlParams.get("mode") as Mode,
			changed: true,
		});
		setTimeout(
			() =>
				paramsStore.set({
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

{#if params.user && !params.changed}
	<SvelteLastFMViewer
		user={params.user}
		updateInterval={params.updateInterval
			? params.updateInterval
			: undefined}
		mode={params.mode}
	/>
{:else}
	<p>Component will render here</p>
{/if}
