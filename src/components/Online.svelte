<script lang="ts">
	import { onMount } from "svelte";
	import { computerData } from "../states.svelte";

	onMount(() => {
		const get = async () => {
			const request = await fetch("https://api.trafficlunar.net/computer");
			const data = (await request.json()) as ApiResponse;
			computerData.data = data;
		};

		get();
		const interval = setInterval(get, 30000);
		return () => clearInterval(interval);
	});
</script>

<section class="side">
	<legend>status</legend>

	<div class="flex justify-center items-center absolute -top-2 right-2 -z-10">
		<div class="size-4 rounded-full {computerData.data?.online ? 'bg-green' : 'bg-red'}"></div>
		<div
			class="size-4 rounded-full absolute animate-duration-2s animate-delay-2s {computerData.data?.online ? 'bg-green animate-ping' : 'bg-red'}"
		></div>
	</div>

	<span>I'M</span>
	<span class={`font-black ${computerData.data?.online ? "text-green" : "text-red"}`}>{computerData.data?.online ? "ONLINE" : "OFFLINE"}.</span>
	<p class="text-surface2 text-xs mt-1">feel free to reach out!</p>
</section>
