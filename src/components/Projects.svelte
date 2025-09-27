<script lang="ts">
	import { onMount } from "svelte";
	import ProjectCard from "./ProjectCard.svelte";

	interface Project {
		owner: string;
		name: string;
		description: string;
		stargazers_count: number;
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

	const additionalData: Record<string, Partial<Project>> = {
		"tomodachi-share": {
			owner: "trafficlunar",
			description: "Discover and share Mii residents for your Tomodachi Life island!",
			url: "https://github.com/trafficlunar/tomodachi-share",
			websiteUrl: "https://tomodachishare.com",
			year: 2025,
			image: "/projects/tomodachi-share.png",
		},
		blockmatic: {
			owner: "trafficlunar",
			description: "Online pixel art editor for Minecraft (with support for images!)",
			url: "https://github.com/trafficlunar/blockmatic",
			websiteUrl: "https://blockmatic.trafficlunar.net",
			year: 2024,
			image: "/projects/blockmatic.png",
		},
		"options-profiles": {
			owner: "trafficlunar",
			description: "A Minecraft mod that lets you load and save your options from in-game",
			url: "https://github.com/trafficlunar/options-profiles",
			websiteUrl: "https://modrinth.com/mod/options-profiles",
			year: 2023,
			image: "/projects/options-profiles.png",
		},
		website: {
			owner: "trafficlunar",
			description: "You're on it right now! My personal website (also hosted on nekoweb!)",
			url: "https://github.com/trafficlunar/website",
		},
		api: {
			owner: "trafficlunar",
			description: "Backend for my website and small projects",
			url: "https://github.com/trafficlunar/api",
		},
		"computer-statistics": {
			owner: "trafficlunar",
			description: "A very simple application to send computer statistics (CPU, RAM, keyboard presses, etc.) to my API",
			url: "https://github.com/trafficlunar/computer-statistics",
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

{#snippet projectColumn(data: Project[])}
	<div class="flex flex-col gap-4">
		{#each data as project}
			<ProjectCard
				name={project.name}
				description={project.description}
				sourceUrl={project.url}
				stars={project.stargazers_count}
				color={project.color}
				language={project.language}
				websiteUrl={project.websiteUrl}
				year={project.year}
				image={project.image}
			/>
		{/each}
	</div>
{/snippet}

<div class="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
	{@render projectColumn(leftColumn)}
	{@render projectColumn(rightColumn)}
</div>
