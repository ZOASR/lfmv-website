/** @jsxImportSource react */

import type React from "react";

import { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type FormParams = {
	username: string | undefined;
	updateInterval: string | undefined;
	mode: "dev" | "prod" | undefined;
};

const themeConfig = {
	react: {
		accent: "bg-react/20",
		badgeClass: "text-react border-react/30 bg-react/10",
		liveIndicator: "bg-react fill-react",
		hoverAccent: "hover:text-react",
		borderAccent: "border-react/30",
		hoverBackground: "hover:bg-react/30 hover:text-react",
		button: "bg-react hover:bg-react/80",
	},
	svelte: {
		accent: "bg-svelte/20",
		badgeClass: "text-svelte border-svelte/30 bg-svelte/10",
		liveIndicator: "bg-svelte fill-svelte",
		hoverAccent: "hover:text-svelte",
		borderAccent: "border-svelte/30",
		hoverBackground: "hover:bg-svelte/30 hover:text-svelte",
		button: "bg-svelte hover:bg-svelte/80",
	},
	solid: {
		accent: "bg-solid/20",
		badgeClass: "text-solid border-solid/30 bg-solid/10",
		liveIndicator: "bg-solid fill-solid",
		hoverAccent: "hover:text-solid",
		borderAccent: "border-solid/30",
		hoverBackground: "hover:bg-solid/30 hover:text-solid",
		button: "bg-solid hover:bg-solid/80",
	},
	default: {
		accent: "#10b981",
		badgeClass: "bg-green-900/50 text-green-400",
		liveIndicator: "bg-green-500",
		hoverAccent: "hover:text-white",
		borderAccent: "border-gray-600",
		hoverBackground: "hover:bg-gray-700",
	},
};

function ComponentForm({ theme }: { theme: "react" | "svelte" | "solid" }) {
	const currentTheme = themeConfig[theme];

	const [formDataObject, setFormDataObject] = useState<FormParams>({
		username: "",
		updateInterval: "",
		mode: "dev",
	});

	const handleChange = (field: string, value: string) => {
		setFormDataObject((prev) => ({ ...prev, [field]: value }));
	};
	useEffect(() => {
		const keys: string[] = [];
		const lsFormString = localStorage.getItem("formData");
		const lsForm: FormParams | null = lsFormString
			? JSON.parse(lsFormString)
			: null;
		const urlParams = new URLSearchParams(location.search);
		for (const key of urlParams.keys()) {
			keys.push(key);
		}
		if (lsForm) {
			setFormDataObject({
				username: lsForm.username,
				updateInterval: lsForm.updateInterval,
				mode: lsForm.mode,
			});
		} else if (keys) {
			setFormDataObject({
				username: urlParams.get("username") as string | undefined,
				updateInterval: urlParams.get("updateInterval") as
					| string
					| undefined,
				mode: urlParams.get("mode") as "dev" | "prod" | undefined,
			});
		}
	}, []);
	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const newFormData = new FormData(e.target as HTMLFormElement);
		const params = new URLSearchParams(newFormData as any);
		localStorage.setItem(
			"formData",
			JSON.stringify({
				username: newFormData?.get("username"),
				updateInterval: newFormData?.get("updateInterval"),
				mode: newFormData?.get("mode"),
			})
		);
		window.history.replaceState({}, "", `${location.pathname}?${params}`);
		window.dispatchEvent(new Event("querychanged"));
	}
	return (
		<div className="flex justify-center items-center">
			<Card
				className={cn(
					"w-full max-w-xl my-2 shadow-2xl border-gray-700 bg-gray-800/90 backdrop-blur-md",
					currentTheme.borderAccent,
					currentTheme.accent
				)}
			>
				<CardHeader className="pb-2">
					<CardTitle className="text-2xl font-bold text-white">
						Component Configuration
					</CardTitle>
					<CardDescription className="text-gray-300">
						Configure your Component settings and preferences
					</CardDescription>
				</CardHeader>
				<form onSubmit={handleSubmit}>
					<CardContent className="space-y-4">
						<div className="flex justify-between gap-4 flex-col sm:flex-row">
							<div className=" flex-1 space-y-2 relative">
								<Label
									htmlFor="username"
									className="text-sm font-medium text-gray-200"
								>
									Username
								</Label>
								<Input
									id="username"
									name="username"
									value={formDataObject.username}
									onChange={(e) =>
										handleChange("username", e.target.value)
									}
									className=" text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
								/>
							</div>
						</div>

						<div className="flex justify-between gap-4 flex-col sm:flex-row">
							<div className="sm:max-w-1/2 flex-1 space-y-2">
								<Label
									htmlFor="updateInterval"
									className="text-sm font-medium text-gray-200"
								>
									Update Interval (ms)
								</Label>
								<Input
									id="updateInterval"
									name="updateInterval"
									type="number"
									value={formDataObject.updateInterval}
									onChange={(e) =>
										handleChange(
											"updateInterval",
											e.target.value
										)
									}
									className=" text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
								/>
							</div>
							<div className="sm:max-w-1/2 flex-1 space-y-2">
								<Label
									htmlFor="mode"
									className="text-sm font-medium text-gray-200"
								>
									Mode
								</Label>
								<Select
									value={formDataObject.mode}
									name="mode"
									onValueChange={(value) =>
										handleChange("mode", value)
									}
								>
									<SelectTrigger
										id="mode"
										name="mode"
										className=" text-white focus:border-blue-500 focus:ring-blue-500 w-full"
									>
										<SelectValue placeholder="Select mode" />
									</SelectTrigger>
									<SelectContent className="bg-gray-700 border-gray-600">
										<SelectItem
											value="dev"
											className="text-white hover:bg-gray-600 focus:bg-gray-600"
										>
											Development
										</SelectItem>
										<SelectItem
											value="prod"
											className="text-white hover:bg-gray-600 focus:bg-gray-600"
										>
											Production
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					</CardContent>
					<CardFooter className="flex justify-center pt-2">
						<Button
							type="submit"
							className={cn(
								"w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white",
								currentTheme.button
							)}
						>
							Save & Render
						</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}

export default ComponentForm;
