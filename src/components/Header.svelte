<script lang="ts">
	const links = [
		{ name: "home", url: "/" },
		{ name: "status", url: "/status/" },
		{ name: "buttons", url: "/buttons/" },
	];

	let pathname = $state("/");
	let isTransitioning = $state(false);
	let activeIndex = $derived(links.findIndex((link) => link.url === pathname));

	// Astro.url.pathname did not work here presumably due to swup
	const getPathname = () => {
		const newPath = window.location.pathname;
		if (newPath !== pathname) {
			isTransitioning = true;
			pathname = newPath;
			setTimeout(() => {
				isTransitioning = false;
			}, 150); // Half of 300ms transition
		}
	};

	getPathname();
	document.addEventListener("astro:page-load", getPathname);
</script>

<section class="p-1.5! mb-8 w-fit">
	<div class="relative grid grid-cols-3 gap-1.5">
		<!-- Animated background for active link -->
		{#if activeIndex !== -1}
			<div
				class="absolute inset-0 bg-peach rounded w-[calc((100%/3)-0.25rem)] pointer-events-none z-10 transition-all duration-300 ease-out"
				style="transform: translateX(calc({activeIndex * 100}% + {activeIndex * 0.375}rem)) {isTransitioning ? 'scale(1.1)' : 'scale(1)'};"
			></div>
		{/if}

		{#each links as item}
			<div class="relative group">
				<div class="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-surface0/50 z-0"></div>
				<a
					href={item.url}
					class="relative w-full font-medium text-sm text-center px-4 py-1 rounded-sm block {pathname === item.url ? 'text-base! z-20' : 'z-20'}"
				>
					{item.name}
				</a>
			</div>
		{/each}
	</div>
</section>
