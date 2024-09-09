/** @jsxImportSource solid-js */
import { createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

interface Props {
	component: "Solid" | "React" | "Svelte";
}
type formParams = {
	api_key: string | undefined;
	username: string | undefined;
	updateInterval: string | undefined;
	mode: "dev" | "prod";
};

const ComponentForm = (props: Props) => {
	const [formData, setFormData] = createSignal<FormData>();
	const [formDataObject, setFormDataObject] = createStore<formParams>({
		api_key: "",
		username: "",
		updateInterval: "",
		mode: "dev",
	});
	createEffect(() => {
		const keys: string[] = [];
		const lsFormString = localStorage.getItem("formData");
		const lsForm: formParams | null = lsFormString
			? JSON.parse(lsFormString)
			: null;
		const urlParams = new URLSearchParams(location.search);
		for (const key of urlParams.keys()) {
			keys.push(key);
		}
		if (lsForm) {
			setFormDataObject({
				api_key: lsForm.api_key,
				username: lsForm.username,
				updateInterval: lsForm.updateInterval,
				mode: lsForm.mode,
			});
		} else if (keys) {
			setFormDataObject({
				api_key: urlParams.get("api_key") as string | undefined,
				username: urlParams.get("username") as string | undefined,
				updateInterval: urlParams.get("updateInterval") as
					| string
					| undefined,
				mode: urlParams.get("mode") as "dev" | "prod" | undefined,
			});
		}
	});
	function submit(e: SubmitEvent) {
		e.preventDefault();
		setFormData(new FormData(e.target as HTMLFormElement));
		const params = new URLSearchParams(formData() as any);
		localStorage.setItem(
			"formData",
			JSON.stringify({
				api_key: formData()?.get("api_key"),
				username: formData()?.get("username"),
				updateInterval: formData()?.get("updateInterval"),
				mode: formData()?.get("mode"),
			})
		);
		window.history.replaceState({}, "", `${location.pathname}?${params}`);
		window.dispatchEvent(new Event("querychanged"));
	}
	const classes =
		props.component == "Solid"
			? "bg-[#2c4f7c] shadow-[#2c4f7c]"
			: props.component == "React"
				? "bg-[#61dafb] shadow-[#61dafb]"
				: props.component == "Svelte"
					? "bg-[#ff3e00] shadow-[#ff3e00]"
					: "";
	return (
		<form
			onsubmit={submit}
			method="post"
			class={` mx-auto my-20 flex max-w-max w-full flex-col items-center justify-center gap-4 text-nowrap rounded-md p-8 text-center font-bold ring-2 ring-black/50 shadow-lg ${classes}`}
		>
			<label class="flex w-full items-center justify-between gap-4 rounded-md bg-white/30 p-4 text-gray-900 transition-all duration-300 hover:ring-2 hover:ring-white/50 flex-col sm:!flex-row">
				API key:
				<span class="group relative z-10 size-8 cursor-help rounded-full">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						x="0px"
						y="0px"
						width="100"
						height="100"
						viewBox="0 0 50 50"
						class="h-full w-full"
					>
						<path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z"></path>
					</svg>
					<span class="invisible absolute bottom-[200%] -translate-x-1/2 scale-75 text-nowrap rounded-lg bg-black p-4 text-2xl font-light text-white opacity-0 ring-2 ring-white transition-all duration-300 group-hover:visible group-hover:scale-100 group-hover:opacity-100">
						if you don't have an API key you can get one for free{" "}
						<a
							class="cursor-pointer font-bold underline"
							href="https://www.last.fm/api/account/create"
							target="_blank"
						>
							here
						</a>{" "}
					</span>
				</span>
				<input
					class="rounded-md border-none bg-gray-800 p-4 text-2xl text-gray-400 ring-2 ring-gray-900 focus:rounded-lg focus:ring-gray-700 overflow-ellipsis w-full"
					type="text"
					placeholder="last.fm public api key"
					name="api_key"
					value={formDataObject.api_key}
					required
				/>
			</label>
			<label class="flex w-full items-center justify-between gap-4 rounded-md bg-white/30 p-4 text-gray-900 transition-all duration-300 hover:ring-2 hover:ring-white/50 flex-col sm:!flex-row">
				Username:
				<input
					required
					class="rounded-md border-none bg-gray-800 p-4 text-2xl text-gray-400 ring-2 ring-gray-900 focus:rounded-lg focus:ring-gray-700 flex-1 w-full"
					type="text"
					placeholder="last.fm username"
					name="username"
					value={formDataObject.username}
				/>
			</label>
			<label class="flex w-full items-center justify-between gap-4 rounded-md bg-white/30 p-4 text-gray-900 transition-all duration-300 hover:ring-2 hover:ring-white/50 flex-col sm:!flex-row">
				Update Interval(ms):
				<input
					class="flex-1 rounded-md border-none bg-gray-800 p-4 text-2xl text-gray-400 ring-2 ring-gray-900 focus:rounded-lg focus:ring-gray-700"
					type="number"
					placeholder="10000"
					name="updateInterval"
					min="10000"
					max="99999"
					value={formDataObject.updateInterval}
				/>
			</label>
			<label class="flex w-full items-center justify-between gap-4 rounded-md bg-white/30 p-4 text-gray-900 transition-all duration-300 hover:ring-2 hover:ring-white/50 flex-col sm:!flex-row">
				Mode:
				<select
					class="flex-1 rounded-md border-none bg-gray-800 p-4 text-2xl text-gray-400 ring-2 ring-gray-900 focus:rounded-lg focus:ring-gray-700"
					name="mode"
					value={formDataObject.mode || "dev"}
				>
					<option value="dev">dev</option>
					<option value="prod">prod</option>
				</select>
			</label>
			<input
				type="submit"
				class="cursor-pointer rounded-md border-none bg-gray-800 p-4 px-8 text-2xl font-bold text-gray-400 outline-none ring-1 ring-gray-900 transition-all duration-300 hover:ring-2 hover:ring-black"
				value="Show"
			/>
		</form>
	);
};

export default ComponentForm;
