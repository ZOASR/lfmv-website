/** @jsxImportSource react */

import ReactLastFMViewer from "@lastfm-viewer/react";
import { useEffect, useState } from "react";

type ComponentParams = {
	api_key: null | string;
	user: null | string;
	updateInterval: null | number;
};

const ReactComponent = () => {
	const [params, setParams] = useState<ComponentParams>({
		api_key: null,
		user: null,
		updateInterval: null,
	});
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const watch = () => {
			const urlParams = new URLSearchParams(window.location.search);
			setParams({
				api_key: urlParams.get("api_key"),
				user: urlParams.get("username"),
				updateInterval: Number(urlParams.get("updateInterval")),
			});
		};
		window.addEventListener("querychanged", watch);

		setParams({
			api_key: urlParams.get("api_key"),
			user: urlParams.get("username"),
			updateInterval: Number(urlParams.get("updateInterval")),
		});

		return () => {
			window.removeEventListener("querychanged", watch);
		};
	}, []);
	return (
		<>
			<ReactLastFMViewer
				api_key={params.api_key ? params.api_key : ""}
				user={params.user ? params.user : ""}
				updateInterval={
					params.updateInterval ? params.updateInterval : undefined
				}
			/>
		</>
	);
};

export default ReactComponent;
