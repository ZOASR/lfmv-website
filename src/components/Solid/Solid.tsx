/** @jsxImportSource solid-js */
import SolidLastFMViewer from "@lastfm-viewer/solid";
import { Show } from "solid-js";
import { createStore } from "solid-js/store";

type ComponentParams = {
	api_key: null | string;
	user: null | string;
	updateInterval: null | number;
	mode: "dev" | "prod";
	changed: boolean;
};

type Mode = "dev" | "prod";

const Solid = () => {
	const [params, setParams] = createStore<ComponentParams>({
		api_key: null,
		user: null,
		updateInterval: null,
		mode: "dev",
		changed: false,
	});
	const urlParams = new URLSearchParams(window.location.search);
	setParams({
		api_key: urlParams.get("api_key"),
		user: urlParams.get("username"),
		updateInterval: Number(urlParams.get("updateInterval")),
		mode: urlParams.get("updateInterval") as Mode,
	});
	window.addEventListener("querychanged", () => {
		const urlParams = new URLSearchParams(window.location.search);
		setParams({
			api_key: urlParams.get("api_key"),
			user: urlParams.get("username"),
			updateInterval: Number(urlParams.get("updateInterval")),
			mode: urlParams.get("mode") as Mode,
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
					mode={params.mode}
				/>
			</Show>
		</>
	);
};

export default Solid;
