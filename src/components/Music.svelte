<script lang="ts">
	import { onMount } from "svelte";

	let song = $state("loading...");
	let artist = $state("...");
	let image = $state("/missing.webp");
	let url = $state("");
	let playing = $state(false);

	onMount(() => {
		const get = async () => {
			const request = await fetch("https://api.trafficlunar.net/song");
			const data = await request.json();

			song = data.song;
			artist = data.artist;
			image = data.image;
			url = data.url;
			playing = data.playing;
		};

		get();
		const interval = setInterval(get, 30000);

		return () => clearInterval(interval);
	});
</script>

<a href={url} class="block relative h-24 group">
	<div class="absolute size-full rounded-md bg-mantle border border-surface0 z-10"></div>

	<div class="flex justify-center items-center absolute -top-2 right-2 z-0">
		<div class="w-4 h-4 rounded-full {playing ? 'bg-green' : 'bg-red'}"></div>
		<div class="w-4 h-4 rounded-full absolute animate-duration-2s animate-delay-2s {playing ? 'bg-green animate-ping' : 'bg-red'}"></div>
	</div>

	<div class="absolute p-2 flex gap-2 z-30 w-full">
		<img src={image} alt="album cover" class="size-20 rounded-full animate-spin animate-duration-30s" />

		<div class="flex flex-col w-full min-w-0">
			<h1 class="font-medium">{song}</h1>
			<span class="text-xs">{artist}</span>
		</div>
	</div>

	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="22"
		height="22"
		viewBox="0 0 20 20"
		class="absolute right-2 top-2 z-10 text-overlay1 transition-all group-hover:top-1.5 group-hover:right-1.5 group-hover:text-peach"
		><path
			fill="currentColor"
			d="M6.25 4.5A1.75 1.75 0 0 0 4.5 6.25v7.5c0 .966.784 1.75 1.75 1.75h7.5a1.75 1.75 0 0 0 1.75-1.75v-2a.75.75 0 0 1 1.5 0v2A3.25 3.25 0 0 1 13.75 17h-7.5A3.25 3.25 0 0 1 3 13.75v-7.5A3.25 3.25 0 0 1 6.25 3h2a.75.75 0 0 1 0 1.5zm4.25-.75a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0V5.56l-3.72 3.72a.75.75 0 1 1-1.06-1.06l3.72-3.72h-3.19a.75.75 0 0 1-.75-.75"
		/></svg
	>
</a>
