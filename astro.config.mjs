// @ts-check
import { defineConfig } from "astro/config";
import { env } from "node:process";
import { loadEnv } from "vite";

import tailwindcss from "@tailwindcss/vite";
import nekoweb from "@indiefellas/astro-adapter-nekoweb";
import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";

import swup, { Theme } from "@swup/astro";

const { NEKOWEB_API_KEY, NEKOWEB_COOKIE } = loadEnv(env.NODE_ENV ?? "", process.cwd(), "");

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
	},
	site: "https://trafficlunar.net",
	adapter: nekoweb({
		apiKey: NEKOWEB_API_KEY,
		cookie: NEKOWEB_COOKIE,
		folder: "dist",
	}),
	integrations: [svelte(), sitemap(), swup()],
});
