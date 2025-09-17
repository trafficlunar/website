<script lang="ts">
	const links = [
		{ name: "home", url: "/" },
		{ name: "status", url: "/status/" },
		{ name: "uses", url: "/uses/" },
	];

	let pathname = $state("/");
	let activeIndex = $derived(links.findIndex((link) => link.url === pathname));

	// Astro.url.pathname did not work here presumably due to swup
	const getPathname = () => {
		pathname = window.location.pathname;
	};

	getPathname();
	document.addEventListener("astro:page-load", getPathname);
</script>

<section class="!p-1.5 mb-8 w-fit">
	<div class="relative grid grid-cols-3 gap-1.5">
		<!-- Animated background for active link -->
		{#if activeIndex !== -1}
			<div
				class="absolute inset-0 bg-peach rounded w-[calc((100%/3)-0.25rem)] transition-transform duration-300 ease-out"
				style="transform: translateX(calc({activeIndex * 100}% + {activeIndex * 0.375}rem));"
			></div>
		{/if}

		{#each links as item}
			<!-- Div here to hide the hover background behind the animated background -->
			<a
				href={item.url}
				class="z-10 w-full font-medium text-sm text-center px-4 py-1 rounded-sm transition-colors duration-200 {pathname === item.url
					? '!text-base'
					: 'hover:bg-surface0'}"
			>
				{item.name}
			</a>
		{/each}
	</div>
</section>
