<script lang="ts">
	import { onMount } from "svelte";

	let age = $state("");

	onMount(() => {
		const interval = setInterval(() => {
			// only people who can read code can see my birthday
			const birthday = new Date("03/02/2010");
			const currentDate = new Date();

			const diffInMs = currentDate.getTime() - birthday.getTime();
			const msInYear = 365.25 * 24 * 60 * 60 * 1000;

			age = (diffInMs / msInYear).toFixed(14);
		}, 10);

		return () => clearInterval(interval);
	});
</script>

<span class="font-mono">{age}</span>
