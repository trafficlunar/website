<script lang="ts">
	interface Props {
		name: string;
		description: string;
		sourceUrl: string;
		websiteUrl?: string;
		stars: number;
		color: string | undefined;
		language: string;
		image?: string;
		year?: number;
	}

	let { name, description, sourceUrl, websiteUrl, stars, color, language, image, year }: Props = $props();
</script>

<div class="group relative hover:-translate-y-1 transition-transform duration-200">
	<section class="h-full p-0! flex flex-col transition-colors group-hover:border-peach/50!">
		{#if year}
			<span class="absolute top-2 left-2 bg-peach text-base px-2 py-1 rounded-full text-xs font-medium z-10 shadow-md">{year}</span>
		{/if}

		<!-- Image -->
		{#if image}
			<div class="relative overflow-hidden">
				<img src={image} width="600" height="300" loading="lazy" alt="thumbnail" class="rounded-t-lg object-cover aspect-video w-full" />
				<div class="absolute inset-0 bg-linear-to-t from-mantle/90 via-mantle/30 to-transparent"></div>
			</div>
		{/if}

		<!-- Information -->
		<div class="p-4 flex flex-col flex-1">
			<h1 class="font-medium text-xl mb-1 text-nowrap overflow-hidden text-ellipsis w-11/12" title={name}>{name}</h1>
			<p class="mb-4 text-sm text-subtext0">{description}</p>

			<div class="text-sm flex gap-6 mt-auto">
				<div class="flex items-center gap-1">
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" class="text-yellow"
						><path
							fill="currentColor"
							d="m12 17.275l-4.15 2.5q-.275.175-.575.15t-.525-.2t-.35-.437t-.05-.588l1.1-4.725L3.775 10.8q-.25-.225-.312-.513t.037-.562t.3-.45t.55-.225l4.85-.425l1.875-4.45q.125-.3.388-.45t.537-.15t.537.15t.388.45l1.875 4.45l4.85.425q.35.05.55.225t.3.45t.038.563t-.313.512l-3.675 3.175l1.1 4.725q.075.325-.05.588t-.35.437t-.525.2t-.575-.15z"
						/></svg
					>
					<span>{stars}</span>
				</div>

				<div class="flex items-center gap-1.5">
					<div class={`size-3 rounded-full ${color}`}></div>
					<span>{language}</span>
				</div>
			</div>

			<!-- Buttons -->
			<hr class="border-surface0 my-4" />
			<div class="grid grid-cols-2 gap-2 {!websiteUrl && 'grid-cols-1!'}">
				<a
					href={sourceUrl}
					class="bg-surface0/50 border border-surface1/50 text-subtext1 font-medium p-2 rounded-md flex justify-center items-center gap-2 text-sm"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
						/></svg
					>
					Source
				</a>

				{#if websiteUrl}
					<a
						href={websiteUrl}
						class="bg-peach/25 border border-peach/50 text-peach font-medium p-2 rounded-md flex justify-center items-center gap-2 text-sm"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"
							><g fill="none" stroke="currentColor" stroke-width="3"
								><path stroke-linejoin="round" d="M3 24a21 21 0 1 0 42 0a21 21 0 1 0-42 0" /><path
									stroke-linejoin="round"
									d="M15 24a9 21 0 1 1 18 0a9 21 0 1 1-18 0"
								/><path stroke-linecap="round" d="M4.5 31h39m-39-14h39" /></g
							></svg
						>
						Website
					</a>
				{/if}
			</div>
		</div>
	</section>
</div>
