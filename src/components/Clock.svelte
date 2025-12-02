<script lang="ts">
	import { onMount } from "svelte";

	let clock = $state("00:00:00 am");
	let date = $state("1 Dec");

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

<section class="side">
	<legend>clock</legend>

	<span class="block font-bold text-lg">{clock}</span>
	<span class="block text-xs">{date}</span>
</section>
