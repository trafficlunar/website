<script lang="ts">
	import { scale } from "svelte/transition";

	let button: HTMLButtonElement;
	let hasCopied = false;

	function handleCopy() {
		navigator.clipboard.writeText(
			'<a href="https://trafficlunar.net/" target="_blank"><img src="https://trafficlunar.net/88x31.gif" alt="trafficlunar" /></a>'
		);
		hasCopied = true;
		button.setAttribute("data-tooltip", "Copied!");

		setTimeout(() => {
			hasCopied = false;
			button.setAttribute("data-tooltip", "Copy");
		}, 1000);
	}
</script>

<div class="absolute right-2">
	<button aria-label="Copy Button Code" data-tooltip="Copy" onclick={handleCopy} bind:this={button} class="cursor-pointer size-5.5">
		{#if hasCopied}
			<svg in:scale out:scale xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" class="absolute top-0 left-0"
				><path fill="currentColor" d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z" /></svg
			>
		{:else}
			<svg in:scale out:scale xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" class="absolute inset-0"
				><g fill="none"
					><path
						fill="currentColor"
						fill-opacity="0.16"
						d="M18.6 9h-7.2A2.4 2.4 0 0 0 9 11.4v7.2a2.4 2.4 0 0 0 2.4 2.4h7.2a2.4 2.4 0 0 0 2.4-2.4v-7.2A2.4 2.4 0 0 0 18.6 9"
					/><path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-miterlimit="10"
						stroke-width="1.5"
						d="M6 15h-.6C4.07 15 3 13.93 3 12.6V5.4C3 4.07 4.07 3 5.4 3h7.2C13.93 3 15 4.07 15 5.4V6m-3.6 3h7.2a2.4 2.4 0 0 1 2.4 2.4v7.2a2.4 2.4 0 0 1-2.4 2.4h-7.2A2.4 2.4 0 0 1 9 18.6v-7.2A2.4 2.4 0 0 1 11.4 9"
					/></g
				></svg
			>
		{/if}
	</button>
</div>
