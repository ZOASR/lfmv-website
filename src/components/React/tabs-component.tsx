import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React from "react";

const TabsComponent = () => {
	return (
		<Tabs defaultValue="react" className="w-full">
			<div className="flex justify-center mb-6">
				<TabsList className="bg-gray-900/50 border border-gray-800">
					<TabsTrigger
						value="react"
						className="data-[state=active]:bg-react/20 data-[state=active]:!text-react px-6"
					>
						react
					</TabsTrigger>
					<TabsTrigger
						value="solid"
						className="data-[state=active]:bg-solid/20 data-[state=active]:!text-solid px-6"
					>
						solid-js
					</TabsTrigger>
					<TabsTrigger
						value="svelte"
						className="data-[state=active]:bg-svelte/20 data-[state=active]:!text-svelte px-6"
					>
						svelte
					</TabsTrigger>
				</TabsList>
			</div>

			<div className="flex justify-center mb-6">
				<TabsList className="bg-gray-900/50 border border-gray-800">
					<TabsTrigger
						value="npm"
						className="data-[state=active]:bg-red-600/20 data-[state=active]:text-red-400 px-6"
					>
						npm
					</TabsTrigger>
					<TabsTrigger
						value="pnpm"
						className="data-[state=active]:bg-yellow-600/20 data-[state=active]:text-yellow-400 px-6"
					>
						pnpm
					</TabsTrigger>
					<TabsTrigger
						value="yarn"
						className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400 px-6"
					>
						yarn
					</TabsTrigger>
					<TabsTrigger
						value="bun"
						className="data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-400 px-6"
					>
						bun
					</TabsTrigger>
				</TabsList>
			</div>

			<TabsContent value="react">
				<div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden relative">
					<div className="absolute inset-0 bg-blue-500/5 pointer-events-none"></div>
					{/* <!-- <SyntaxHighlighter
						language="bash"
						style={atomDark}
						customStyle={{
							margin: 0,
							padding: "1.5rem",
							background: "transparent",
							fontSize: "1rem",
						}}
					>
						npm install @lastfm-viewer/react
						</SyntaxHighlighter> --> */}
					npm install @lastfm-viewer/react
				</div>
			</TabsContent>

			<TabsContent value="solid">
				<div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden relative">
					<div className="absolute inset-0 bg-blue-500/5 pointer-events-none"></div>
					{/* <!-- <SyntaxHighlighter
						language="bash"
						style={atomDark}
						customStyle={{
							margin: 0,
							padding: "1.5rem",
							background: "transparent",
							fontSize: "1rem",
						}}
					>
						npm install @lastfm-viewer/solid
						</SyntaxHighlighter> --> */}
					npm install @lastfm-viewer/solid
				</div>
			</TabsContent>

			<TabsContent value="svelte">
				<div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden relative">
					<div className="absolute inset-0 bg-orange-500/5 pointer-events-none"></div>
					{/* <!-- <SyntaxHighlighter
						language="bash"
						style={atomDark}
						customStyle={{
							margin: 0,
							padding: "1.5rem",
							background: "transparent",
							fontSize: "1rem",
						}}
					>
						npm install @lastfm-viewer/svelte
						</SyntaxHighlighter> --> */}
					npm install @lastfm-viewer/svelte
				</div>
			</TabsContent>
		</Tabs>
	);
};

export default TabsComponent;
