<script lang="ts">
	import { onMount } from "svelte";
	import ProjectCard from "./ProjectCard.svelte";

	interface Project {
		name: string;
		owner: string;
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

	let leftColumn: Project[] = $state([
		{
			name: "tomodachi-share",
			owner: "trafficlunar",
			description: "Discover and share Mii residents for your Tomodachi Life island!",
			stargazers_count: 0,
			language: "",
			url: "https://github.com/trafficlunar/tomodachi-share",
			websiteUrl: "https://tomodachishare.com",
			year: 2025,
			image: "/projects/tomodachi-share.png",
		},
		{
			name: "tomodachi-share",
			owner: "trafficlunar",
			description: "A Minecraft mod that lets you load and save your options from in-game",
			stargazers_count: 0,
			language: "",
			url: "https://github.com/trafficlunar/options-profiles",
			websiteUrl: "https://modrinth.com/mod/options-profiles",
			year: 2023,
			image: "/projects/options-profiles.png",
		},
		{
			name: "api",
			owner: "trafficlunar",
			description: "Backend for my website and small projects",
			stargazers_count: 0,
			language: "",
			url: "https://github.com/trafficlunar/api",
		},
	]);
	let rightColumn: Project[] = $state([
		{
			name: "blockmatic",
			owner: "trafficlunar",
			description: "Online pixel art editor for Minecraft (with support for images!)",
			stargazers_count: 0,
			language: "",
			url: "https://github.com/trafficlunar/blockmatic",
			websiteUrl: "https://blockmatic.trafficlunar.net",
			year: 2024,
			image: "/projects/blockmatic.png",
		},
		{
			name: "website",
			owner: "trafficlunar",
			description: "You're on it right now! My personal website (also hosted on nekoweb!)",
			stargazers_count: 0,
			language: "",
			url: "https://github.com/trafficlunar/website",
		},
		{
			name: "computer-statistics",
			owner: "trafficlunar",
			description: "A very simple application to send computer statistics (CPU, RAM, keyboard presses, etc.) to my API",
			stargazers_count: 0,
			language: "",
			url: "https://github.com/trafficlunar/computer-statistics",
		},
	]);

	// Send request to API and fill in missing data
	onMount(async () => {
		const response = await fetch("https://api.trafficlunar.net/projects");
		const data: Project[] = await response.json();

		const mapProject = (column: Project[]) => {
			column.forEach((p, index) => {
				const apiData = data.find((proj) => proj.name === p.name);
				if (!apiData) return;

				// Add missing data
				column[index] = {
					...p,
					stargazers_count: apiData.stargazers_count,
					language: apiData.language,
					color: languageColors[apiData.language ?? ""] ?? "bg-overlay0", // Get color of language
				};
			});
		};

		mapProject(leftColumn);
		mapProject(rightColumn);
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
