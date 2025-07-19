<script lang="ts">
	import { onMount } from "svelte";
	import ProjectCard from "./ProjectCard.svelte";

	interface Project {
		owner: string;
		name: string;
		description: string;
		stars: number;
		language: string;
		url: string;
		color?: string;
		websiteUrl?: string;
		year?: number;
		image?: string;
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

	const additionalData: Record<string, { websiteUrl?: string; year?: number; image?: string }> = {
		"tomodachi-share": {
			websiteUrl: "https://tomodachishare.com",
			year: 2025,
			image: "/projects/tomodachi-share.png",
		},
		blockmatic: {
			websiteUrl: "https://blockmatic.trafficlunar.net",
			year: 2024,
			image: "/projects/blockmatic.png",
		},
		"options-profiles": {
			websiteUrl: "https://modrinth.com/mod/options-profiles",
			year: 2023,
			image: "/projects/options-profiles.png",
		},
	};

	let leftColumn: Project[] = $state([]);
	let rightColumn: Project[] = $state([]);

	onMount(async () => {
		const response = await fetch("https://api.trafficlunar.net/projects");
		const data: Project[] = await response.json();

		data.forEach((p, index) => {
			const extra = additionalData[p.name] || {};
			const project = {
				...p,
				color: languageColors[p.language ?? ""] ?? "bg-overlay0",
				...extra,
			};

			if (index % 2 === 0) {
				leftColumn.push(project);
			} else {
				rightColumn.push(project);
			}
		});
	});
</script>

<div class="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
	<div class="flex flex-col gap-4">
		{#each leftColumn as project}
			<ProjectCard
				name={project.name}
				description={project.description}
				sourceUrl={project.url}
				stars={project.stars}
				color={project.color}
				language={project.language}
				websiteUrl={project.websiteUrl}
				year={project.year}
				image={project.image}
			/>
		{/each}
	</div>
	<div class="flex flex-col gap-4">
		{#each rightColumn as project}
			<ProjectCard
				name={project.name}
				description={project.description}
				sourceUrl={project.url}
				stars={project.stars}
				color={project.color}
				language={project.language}
				websiteUrl={project.websiteUrl}
				year={project.year}
				image={project.image}
			/>
		{/each}
	</div>
</div>
