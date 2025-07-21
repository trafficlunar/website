<script lang="ts">
	import { Area, Axis, Chart, Highlight, LinearGradient, Svg, Tooltip } from "layerchart";
	import { scaleTime } from "d3-scale";
	import { onMount } from "svelte";
	import { computerData } from "../states.svelte";

	type GraphData = {
		timestamp: Date;
		cpu: number;
		ram: number;
		keys: number;
		clicks: number;
	}[];

	let online = $state(false);

	let currentCPU = $state(0);
	let currentRAM = $state(0);
	let clicksPerMinute = $state(0);
	let keysPerMinute = $state(0);

	let uptime = $state("");
	let allTimeClicks = $state(0);
	let allTimeKeys = $state(0);

	let chartData = $state<GraphData>([]);

	onMount(() => {
		let uptimeStart: Date;

		const get = async () => {
			const data = computerData.data; // no point in this; looks better
			if (!data) return;

			online = data.online;
			uptimeStart = new Date(data.uptimeStart * 1000); // convert to milliseconds
			setUptime();

			currentCPU = data.graph[data.graph.length - 1].cpu;
			currentRAM = data.graph[data.graph.length - 1].ram;

			allTimeClicks = data.totals.clicks;
			allTimeKeys = data.totals.keys;

			chartData = data.graph.map((point) => ({
				...point,
				timestamp: new Date(point.timestamp),
				cpu: point.cpu / 100,
				ram: point.ram / 100,
			}));

			const totalClicks = chartData.reduce((sum, point) => sum + point.clicks, 0);
			const totalKeys = chartData.reduce((sum, point) => sum + point.keys, 0);

			clicksPerMinute = totalClicks / 60; // 60 minutes (max graph data)
			keysPerMinute = totalKeys / 60;
		};

		const setUptime = () => {
			if (!uptimeStart || !online) {
				uptime = "Offline";
				return;
			}
			const diff = Math.floor((Date.now() - uptimeStart.getTime()) / 1000);
			const hrs = String(Math.floor(diff / 3600)).padStart(2, "0");
			const mins = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
			const secs = String(diff % 60).padStart(2, "0");

			uptime = `${hrs}:${mins}:${secs}`;
		};

		get();
		setUptime();

		const interval = setInterval(get, 30000);
		const uptimeInterval = setInterval(setUptime, 1000);

		return () => {
			clearInterval(interval);
			clearInterval(uptimeInterval);
		};
	});
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-0.5 font-mono text-sm p-4">
	<div class="grid grid-cols-2 grid-rows-4 gap-0.5">
		<span class="font-black">CPU:</span>
		<span>{currentCPU}%</span>

		<span class="font-black">RAM:</span>
		<span>{currentRAM}%</span>

		<span class="font-black">Clicks:</span>
		<span>{clicksPerMinute.toFixed(2)}/min</span>

		<span class="font-black">Keys:</span>
		<span>{keysPerMinute.toFixed(2)}/min</span>
	</div>

	<div class="grid grid-cols-2 grid-rows-4 gap-0.5">
		<span class="font-black">Uptime:</span>
		<span>{uptime}</span>

		<span></span>
		<span></span>

		<span class="font-black">All Time Clicks:</span>
		<span>{allTimeClicks}</span>

		<span class="font-black">All Time Keys:</span>
		<span>{allTimeKeys}</span>
	</div>
</div>

<div class="relative h-96">
	<div class="absolute inset-0 size-full rounded-md bg-mantle border border-surface0 z-10"></div>

	<div class="flex justify-center items-center absolute -top-2 right-2 z-0">
		<div class="w-4 h-4 rounded-full {online ? 'bg-green' : 'bg-red'}"></div>
		<div class="w-4 h-4 rounded-full absolute animate-duration-2s animate-delay-2s {online ? 'bg-green animate-ping' : 'bg-red'}"></div>
	</div>

	<div class="absolute inset-0 size-full z-20 p-2">
		<Chart
			data={chartData}
			x="timestamp"
			xScale={scaleTime()}
			y={["cpu", "ram"]}
			yDomain={[0, 1]}
			yNice
			padding={{ left: 32, top: 8, right: 12, bottom: 20 }}
			tooltip={{ mode: "bisect-x" }}
		>
			<Svg>
				<Axis placement="left" grid rule classes={{ tickLabel: "fill-overlay1 font-medium" }} format="percentRound" />
				<Axis placement="bottom" rule classes={{ tickLabel: "fill-overlay1 font-medium" }} />

				<!-- RAM -->
				<LinearGradient class="from-peach/50 to-peach/1" vertical>
					{#snippet children({ gradient })}
						<Area y1={(d) => d.ram} fill={gradient} line={{ class: "stroke-2 stroke-peach" }} />
					{/snippet}
				</LinearGradient>

				<!-- CPU -->
				<LinearGradient class="from-yellow/50 to-yellow/1" vertical>
					{#snippet children({ gradient })}
						<Area y1={(d) => d.cpu} fill={gradient} line={{ class: "stroke-2 stroke-yellow" }} />
					{/snippet}
				</LinearGradient>

				<Highlight lines={{ class: "stroke-peach [stroke-dasharray:unset]" }} />
				<Highlight y={(d) => d.ram} points={{ class: "fill-peach" }} />
				<Highlight y={(d) => d.cpu} points={{ class: "fill-yellow" }} />
			</Svg>

			<Tooltip.Root class="border border-peach bg-peach/10 text-white/85 backdrop-blur-lg">
				{#snippet children({ data })}
					<Tooltip.Header value={data.timestamp} format="time" classes={{ root: "border-peach" }} />
					<Tooltip.List>
						<Tooltip.Item label="RAM (%)" value={data.ram} format="percentRound" classes={{ value: "font-mono font-black" }} />
						<Tooltip.Item label="CPU (%)" value={data.cpu} format="percentRound" classes={{ value: "font-mono font-black" }} />
					</Tooltip.List>
				{/snippet}
			</Tooltip.Root>
		</Chart>
	</div>
</div>

<div class="relative h-48 rounded-md bg-mantle border border-surface0 p-2 mt-2">
	<Chart
		data={chartData}
		x="timestamp"
		xScale={scaleTime()}
		y={["clicks", "keys"]}
		yDomain={[0, null]}
		yNice
		padding={{ left: 32, top: 8, right: 12, bottom: 20 }}
		tooltip={{ mode: "bisect-x" }}
	>
		<Svg>
			<Axis placement="left" rule classes={{ tickLabel: "fill-overlay1 font-medium" }} />
			<Axis placement="bottom" rule classes={{ tickLabel: "fill-overlay1 font-medium" }} />

			<!-- Keys -->
			<LinearGradient class="from-green/50 to-green/1" vertical>
				{#snippet children({ gradient })}
					<Area y1={(d) => d.keys} fill={gradient} line={{ class: "stroke-2 stroke-green" }} />
				{/snippet}
			</LinearGradient>

			<!-- Clicks -->
			<LinearGradient class="from-teal/50 to-teal/1" vertical>
				{#snippet children({ gradient })}
					<Area y1={(d) => d.clicks} fill={gradient} line={{ class: "stroke-2 stroke-teal" }} />
				{/snippet}
			</LinearGradient>

			<Highlight lines={{ class: "stroke-peach [stroke-dasharray:unset]" }} />
			<Highlight y={(d) => d.keys} points={{ class: "fill-green" }} />
			<Highlight y={(d) => d.clicks} points={{ class: "fill-teal" }} />
		</Svg>

		<Tooltip.Root class="border border-peach bg-peach/10 text-white/85 backdrop-blur-lg">
			{#snippet children({ data })}
				<Tooltip.Header value={data.timestamp} format="time" classes={{ root: "border-peach" }} />
				<Tooltip.List>
					<Tooltip.Item label="Keys" value={data.keys} classes={{ value: "font-mono font-black" }} />
					<Tooltip.Item label="Clicks" value={data.clicks} classes={{ value: "font-mono font-black" }} />
				</Tooltip.List>
			{/snippet}
		</Tooltip.Root>
	</Chart>
</div>
