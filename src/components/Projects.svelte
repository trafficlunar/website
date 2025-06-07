<script lang="ts">
	import { onMount } from "svelte";

	interface Project {
		owner: string;
		name: string;
		description: string;
		stars: number;
		language: string;
		url: string;
		color?: string;
	}

	const languageColors: Record<string, string> = {
		JavaScript: "bg-yellow",
		TypeScript: "bg-blue",
		Python: "bg-[#3572A5]",
		Java: "bg-peach",
		Rust: "bg-[#dea584]",
		C: "bg-[#555555]",
		"C++": "bg-[#f34b7d]",
		Go: "bg-sapphire",
		Astro: "bg-[#ff5a03]",
		Svelte: "bg-[#ff3e00]",
	};

	let projects: Project[] = [];

	onMount(async () => {
		const response = await fetch("https://api.trafficlunar.net/projects");
		const data: Project[] = await response.json();

		projects = data.map((project) => ({ ...project, color: languageColors[project.language ?? ""] ?? "bg-overlay0" }));
	});
</script>

<div class="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
	{#each projects as project}
		<a href={project.url} class="group">
			<section class="h-full flex flex-col transition-colors group-hover:!border-peach/50">
				<h1 class="font-medium text-xl mb-1 text-nowrap overflow-hidden text-ellipsis w-11/12" title={project.name}>{project.name}</h1>
				<p class="mb-4 text-sm text-subtext0">{project.description}</p>

				<div class="text-sm flex gap-6 mt-auto">
					<div class="flex items-center gap-1">
						<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" class="text-yellow"
							><path
								fill="currentColor"
								d="m12 17.275l-4.15 2.5q-.275.175-.575.15t-.525-.2t-.35-.437t-.05-.588l1.1-4.725L3.775 10.8q-.25-.225-.312-.513t.037-.562t.3-.45t.55-.225l4.85-.425l1.875-4.45q.125-.3.388-.45t.537-.15t.537.15t.388.45l1.875 4.45l4.85.425q.35.05.55.225t.3.45t.038.563t-.313.512l-3.675 3.175l1.1 4.725q.075.325-.05.588t-.35.437t-.525.2t-.575-.15z"
							/></svg
						>
						<span>{project.stars}</span>
					</div>

					<div class="flex items-center gap-1.5">
						<div class={`size-4 rounded-full ${project.color}`}></div>
						<span>{project.language}</span>
					</div>
				</div>

				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="22"
					height="22"
					viewBox="0 0 20 20"
					class="absolute right-4 top-4 text-overlay1 transition-all group-hover:top-3.5 group-hover:right-3.5 group-hover:text-peach"
					><path
						fill="currentColor"
						d="M6.25 4.5A1.75 1.75 0 0 0 4.5 6.25v7.5c0 .966.784 1.75 1.75 1.75h7.5a1.75 1.75 0 0 0 1.75-1.75v-2a.75.75 0 0 1 1.5 0v2A3.25 3.25 0 0 1 13.75 17h-7.5A3.25 3.25 0 0 1 3 13.75v-7.5A3.25 3.25 0 0 1 6.25 3h2a.75.75 0 0 1 0 1.5zm4.25-.75a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0V5.56l-3.72 3.72a.75.75 0 1 1-1.06-1.06l3.72-3.72h-3.19a.75.75 0 0 1-.75-.75"
					/></svg
				>
			</section>
		</a>
	{/each}
</div>
