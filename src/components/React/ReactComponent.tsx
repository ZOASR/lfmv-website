/** @jsxImportSource react */
import { useEffect, useState } from "react";

import ReactLastFMViewer from "@lastfm-viewer/react";
import "@lastfm-viewer/ui/styles";

type ComponentParams = {
	user: null | string;
	updateInterval: null | number;
	mode: "dev" | "prod";
	changed: boolean;
};

type Mode = "dev" | "prod";

const ReactComponent = () => {
	const [params, setParams] = useState<ComponentParams>({
		user: null,
		updateInterval: null,
		mode: "dev",
		changed: false,
	});
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		setParams({
			user: urlParams.get("username"),
			updateInterval: Number(urlParams.get("updateInterval")),
			mode: urlParams.get("updateInterval") as Mode,
			changed: false,
		});

		const watch = () => {
			const urlParams = new URLSearchParams(window.location.search);
			setParams({
				user: urlParams.get("username"),
				updateInterval: Number(urlParams.get("updateInterval")),
				mode: urlParams.get("mode") as Mode,
				changed: true,
			});
			setParams((prev) => ({
				...prev,
				changed: false,
			}));
		};
		window.addEventListener("querychanged", watch);

		return () => {
			window.removeEventListener("querychanged", watch);
		};
	}, []);
	return (
		<>
			{params.user && !params.changed ? (
				<ReactLastFMViewer
					user={params.user}
					updateInterval={
						params.updateInterval
							? params.updateInterval
							: undefined
					}
					mode={params.mode}
				/>
			) : (
				<p>Component will render here</p>
			)}
		</>
	);
};

export default ReactComponent;
