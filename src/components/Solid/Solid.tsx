/** @jsxImportSource solid-js */
import SolidLastFMViewer from "@lastfm-viewer/solid";
import { Show } from "solid-js";
import { createStore } from "solid-js/store";

type ComponentParams = {
	api_key: null | string;
	user: null | string;
	updateInterval: null | number;
	changed: boolean;
};

const Solid = () => {
	const [params, setParams] = createStore<ComponentParams>({
		api_key: null,
		user: null,
		updateInterval: null,
		changed: false,
	});
	const urlParams = new URLSearchParams(window.location.search);
	setParams({
		api_key: urlParams.get("api_key"),
		user: urlParams.get("username"),
		updateInterval: Number(urlParams.get("updateInterval")),
	});
	window.addEventListener("querychanged", (e) => {
		const urlParams = new URLSearchParams(window.location.search);
		setParams({
			api_key: urlParams.get("api_key"),
			user: urlParams.get("username"),
			updateInterval: Number(urlParams.get("updateInterval")),
			changed: true,
		});
		setParams((prev) => ({
			...prev,
			changed: false,
		}));
	});
	return (
		<>
			<Show
				when={params.api_key && params.user && !params.changed}
				fallback={
					<div class="flex h-full w-full items-center justify-center text-center text-4xl">
						<p class="rounded-lg bg-black/50 p-4 shadow-2xl ring-1 ring-black">
							Component will render here
						</p>
					</div>
				}
			>
				<SolidLastFMViewer
					api_key={params.api_key as string}
					user={params.user as string}
					updateInterval={
						params.updateInterval
							? params.updateInterval
							: undefined
					}
				/>
			</Show>
		</>
	);
};

export default Solid;
