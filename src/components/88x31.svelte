<script lang="ts">
	const coolSites = [
		{ href: "https://melankorin.net/", src: "https://melankorin.net/assets/img/buttons/button-1.gif" },
		{ href: "https://ellenthekat.nekoweb.org", src: "https://ellenthekat.nekoweb.org/Images/oc%20headshot%20style.png" },
		{ href: "https://dimden.dev/", src: "https://dimden.dev/services/images/88x31.gif" },
		{ href: "https://daudix.one", src: "/88x31/sites/daudix.gif" },
		{ href: "https://reduxflakes.nekoweb.org/", src: "/88x31/sites/reduc_anim.gif" },
	];

	const miscButtons = [
		{ href: "https://www.7-zip.org/", src: "/88x31/7zip.gif" },
		{ href: "https://ec.crypton.co.jp/pages/prod/virtualsinger/cv01_us", src: "/88x31/miku.gif" },
		{ href: "https://ublockorigin.com/", src: "/88x31/ublock.png" },
		{ src: "/88x31/xp.gif" },
		{ src: "/88x31/dream.gif" },
		{ href: "https://astro.build/", src: "/88x31/astro.png" },
		{ href: "https://jellyfin.org/", src: "/88x31/jellyfin.gif" },
		{ href: "https://www.qbittorrent.org/", src: "/88x31/qbittorrent.png" },
		{ src: "/88x31/responsive.png" },
		{ src: "/88x31/any88x31.gif" },
		{ src: "/88x31/aperture.jpg" },
		{ href: "https://archive.org/", src: "/88x31/archive.gif" },
		{ src: "/88x31/blends.gif" },
		{ src: "/88x31/button-flexbox.gif" },
		{ src: "/88x31/computer.jpg" },
		{ href: "https://www.firefox.com/en-US/", src: "/88x31/firefox.png" },
		{ src: "/88x31/got_html.gif" },
		{ src: "/88x31/homer.gif" },
		{ src: "/88x31/linux.gif" },
		{ src: "/88x31/love_blahaj.gif" },
		{ src: "/88x31/nyan.gif" },
		{ src: "/88x31/righttorepair.gif" },
		{ src: "/88x31/sourcemissing.gif" },
		{ src: "/88x31/stardew-valley.gif" },
		{ src: "/88x31/tom-scott.webp" },
		{ href: "https://vscodium.com/", src: "/88x31/vscodium.gif" },
		{ src: "/88x31/wii.gif" },
		{ src: "/88x31/plasticlove.gif" },
	];

	const imgStyle = "image-rendering: crisp-edges;";
</script>

<div class="flex items-center gap-4 text-overlay2 text-sm font-medium my-4">
	<hr class="grow border-surface0" />
	<span>cool sites</span>
	<hr class="grow border-surface0" />
</div>

<div class="button-container">
	{#each coolSites as { href, src }}
		<div>
			{#if href}
				<a target="_blank" {href}><img {src} width="88" height="31" alt="button" class="button-88x31" style={imgStyle} /></a>
			{:else}
				<img {src} width="88" height="31" alt="button" class="button-88x31" style={imgStyle} />
			{/if}
		</div>
	{/each}
</div>

<div class="flex items-center gap-4 text-overlay2 text-sm font-medium my-4">
	<hr class="grow border-surface0" />
	<span>misc</span>
	<hr class="grow border-surface0" />
</div>

<div class="button-container">
	{#each miscButtons as { href, src }}
		<div>
			{#if href}
				<a target="_blank" {href}><img {src} width="88" height="31" alt="button" class="button-88x31" style={imgStyle} /></a>
			{:else}
				<img {src} width="88" height="31" alt="button" class="button-88x31" style={imgStyle} />
			{/if}
		</div>
	{/each}
</div>

<style lang="postcss">
	.button-container {
		@apply flex justify-center flex-wrap;
	}

	.button-container div {
		@apply hover:z-10;
	}

	.button-container div:nth-child(odd) .button-88x31 {
		@apply hover:-rotate-2!;
	}

	.button-88x31 {
		@apply hover:scale-125 hover:rotate-2 transition duration-200;
	}

	.button-container:hover .button-88x31:not(:hover) {
		@apply opacity-50 brightness-50;
	}
</style>
