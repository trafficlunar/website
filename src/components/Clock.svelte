<script lang="ts">
	import { onMount } from "svelte";

	let clock = $state("");
	let date = $state("");

	const myTimezone = "Europe/London";

	onMount(() => {
		const interval = setInterval(() => {
			const dateObject = new Date();
			clock = dateObject.toLocaleTimeString("en-US", { timeZone: myTimezone, hour: "2-digit", minute: "2-digit", second: "2-digit" }).toLowerCase();
			date = dateObject.toLocaleDateString("en-GB", { timeZone: myTimezone, day: "numeric", month: "short" });
		}, 100);

		return () => clearInterval(interval);
	});
</script>

<section class="font-mono !py-2.5 min-w-40 h-min">
	<legend>clock</legend>

	<span class="block font-bold text-lg">{clock}</span>
	<span class="block text-xs">{date}</span>
</section>
