import { defineConfig } from "@rsbuild/core";
import { pluginSvelte } from "@rsbuild/plugin-svelte";
import { pluginSass } from "@rsbuild/plugin-sass";

export default defineConfig({
	source: {
		entry: {
			svelte: "./src/index.ts",
			plain: "./src/plain/index.js",
		},
	},
	html: {
		template: "./public/index.html",
		inject: false,
	},
	dev: {
		// progressBar: true,
		hmr: true,
	},
	tools: {
		// rspack: {},
		htmlPlugin: false,
		// postcss: {
		// 	postcssOptions: {},
		// },
	},
	server: {
		publicDir: {
			name: "./public",
		},
	},
	performance: {
		chunkSplit: {
			strategy: "all-in-one",
		},
	},
	output: {
		manifest: true,
		// filename: {
		// 	js: "[name].bundle.js",
		// 	css: "[name].bundle.css",
		// },
	},
	plugins: [
		pluginSass(),
		pluginSvelte({
			svelteLoaderOptions: {
				compilerOptions: {
					enableSourcemap: true,
				},
			},
		}),
	],
});
