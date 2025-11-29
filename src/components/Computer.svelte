<script lang="ts">
	import { onMount } from "svelte";
	import { Area, Axis, Chart, Highlight, LinearGradient, Svg, Tooltip } from "layerchart";
	import { scaleTime } from "d3-scale";
	import { curveBasis } from "d3-shape";
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

	let stopwatchDeg = $state(0);

	let clicksPerMinute = $state(0);
	let keysPerMinute = $state(0);

	let uptime = $state("");
	let allTimeUptime = $state("");
	let allTimeClicks = $state("");
	let allTimeKeys = $state("");

	let chartData = $state<GraphData>([]);

	const formatTime = (time: number): string => {
		const days = Math.floor(time / 86400);
		const hrs = Math.floor((time % 86400) / 3600);
		const mins = Math.floor((time % 3600) / 60);
		const secs = time % 60;

		const parts = [];
		if (days > 0) parts.push(`${days}d`);
		if (hrs > 0 || days > 0) parts.push(`${hrs}h`);
		parts.push(`${mins}m`);
		parts.push(`${secs}s`);

		return parts.join(" ");
	};

	onMount(() => {
		const get = async () => {
			const data = computerData.data; // no point in this; looks better
			if (!data) return;

			online = data.online;

			currentCPU = data.graph[data.graph.length - 1].cpu;
			currentRAM = data.graph[data.graph.length - 1].ram;

			const numberFormat = Intl.NumberFormat("en-US", {
				notation: "compact",
				maximumFractionDigits: 1,
			});

			allTimeClicks = numberFormat.format(data.totals.clicks);
			allTimeKeys = numberFormat.format(data.totals.keys);

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

			// Uptime
			const diff = data.online ? Math.floor((Date.now() - data.uptimeStart * 1000) / 1000) : 0;
			const allTime = diff + data.totals.uptime;

			allTimeUptime = formatTime(allTime);

			if (!data.online) {
				uptime = "Offline";
				return;
			}

			uptime = formatTime(diff);
			// there is a bug where the arrow spins around when it reaches ~354 degrees but it looks cool so i'm not fixing it
			stopwatchDeg = (diff % 60) * 6;
		};

		get();
		const interval = setInterval(get, 1000);
		return () => clearInterval(interval);
	});
</script>

<div class="relative transition-all duration-300 delay-200 starting:opacity-0 starting:translate-y-4">
	<div class="flex justify-center items-center absolute -top-2 right-2 z-0">
		<div class="w-4 h-4 rounded-full {online ? 'bg-green' : 'bg-red'}"></div>
		<div class="w-4 h-4 rounded-full absolute animate-duration-2s animate-delay-2s {online ? 'bg-green animate-ping' : 'bg-red'}"></div>
	</div>

	<section class="mb-0!">
		<legend>computer</legend>

		<div class="font-mono text-sm mb-4 space-y-4">
			<!-- System Stats Row -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<div class="flex items-center justify-between mb-1">
						<span class="text-xs font-black text-overlay2">CPU</span>
						<span class="text-xs font-bold text-peach">{currentCPU}%</span>
					</div>
					<div class="h-1.5 w-full rounded-full overflow-hidden bg-surface0/50">
						<div class="h-full rounded-full bg-peach transition-all duration-300" style="width: {Math.min(100, currentCPU)}%;"></div>
					</div>
				</div>

				<div>
					<div class="flex items-center justify-between mb-1">
						<span class="text-xs font-black text-overlay2">RAM</span>
						<span class="text-xs font-bold text-yellow">{currentRAM}%</span>
					</div>
					<div class="h-1.5 w-full rounded-full overflow-hidden bg-surface0/50">
						<div class="h-full rounded-full bg-yellow transition-all duration-300" style="width: {Math.min(100, currentRAM)}%;"></div>
					</div>
				</div>
			</div>

			<!-- Stats Grid -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<!-- Uptime Card -->
				<div class="bg-surface0/30 rounded-lg p-3 border border-surface0 shadow-sm">
					<div class="flex mb-1">
						<div class="relative">
							<svg width="20" height="20" viewBox="0 0 20 20" fill-rule="evenodd" class="absolute -bottom-0.5 fill-overlay1">
								<path d="M10 5.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11M2.5 11a7.5 7.5 0 1 1 15 0 7.5 7.5 0 0 1-15 0" />
								<path
									d="M2.793 3.793a1 1 0 0 1 1.414 0l1.5 1.5c.91.943-.471 2.324-1.414 1.414l-1.5-1.5a1 1 0 0 1 0-1.414m11.5 2.914a1 1 0 0 0 1.414 0l1.5-1.5c.91-.943-.471-2.324-1.414-1.414l-1.5 1.5a1 1 0 0 0 0 1.414M9 4V2h2v2z"
								/>
								<path d="M7.5 2a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1" />
								<!-- Hand -->
								<path
									d="m 13.28,8.375 c 0.345578,0.4310223 0.276171,1.0606079 -0.155,1.406 l -2.5,2 C 9.583667,12.614333 8.333667,11.052333 9.375,10.219 l 2.5,-2 c 0.431286,-0.3453463 1.060907,-0.2754879 1.406,0.156"
									style="transform: rotate({stopwatchDeg - 52}deg); transform-origin: 10px 11px; transition: transform 1s linear;"
								/>
							</svg>
						</div>
						<span class="font-black text-xs text-overlay1 ml-6">UPTIME</span>
					</div>
					<div class="text-lg font-bold text-text">{uptime}</div>
					<div class="text-xs text-overlay1 mt-1">Total: {allTimeUptime}</div>
				</div>

				<!-- Activity Card -->
				<div class="bg-surface0/30 rounded-lg p-3 border border-surface0 shadow-sm">
					<div class="font-black text-xs text-overlay1 mb-2">ACTIVITY / MIN</div>
					<div class="space-y-1.5">
						<div class="flex justify-between items-center">
							<span class="text-xs text-overlay1">Clicks</span>
							<span class="font-bold text-teal">{clicksPerMinute.toFixed(1)}</span>
						</div>
						<div class="flex justify-between items-center">
							<span class="text-xs text-overlay1">Keys</span>
							<span class="font-bold text-green">{keysPerMinute.toFixed(1)}</span>
						</div>
					</div>
				</div>

				<!-- All Time Card -->
				<div class="bg-surface0/30 rounded-lg p-3 border border-surface0 shadow-sm">
					<div class="font-black text-xs text-overlay1 mb-2">ALL TIME</div>
					<div class="space-y-1.5">
						<div class="flex justify-between items-center">
							<span class="text-xs text-overlay1">Clicks</span>
							<span class="font-bold text-teal">{allTimeClicks}</span>
						</div>
						<div class="flex justify-between items-center">
							<span class="text-xs text-overlay1">Keys</span>
							<span class="font-bold text-green">{allTimeKeys}</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="relative h-96 rounded-md bg-mantle border border-surface0 p-2 shadow-sm">
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
					<Axis
						placement="left"
						grid
						rule
						classes={{ tickLabel: "fill-overlay1 font-medium stroke-none", rule: "stroke-surface0/50", tick: "stroke-surface0/50" }}
						format="percentRound"
					/>
					<Axis
						placement="bottom"
						rule
						classes={{ tickLabel: "fill-overlay1 font-medium stroke-none", rule: "stroke-surface0/50", tick: "stroke-surface0/50" }}
					/>

					<!-- RAM -->
					<LinearGradient class="from-peach/50 to-peach/1" vertical>
						{#snippet children({ gradient })}
							<Area y1={(d) => d.ram} fill={gradient} line={{ class: "stroke-2 stroke-peach" }} curve={curveBasis} />
						{/snippet}
					</LinearGradient>

					<!-- CPU -->
					<LinearGradient class="from-yellow/50 to-yellow/1" vertical>
						{#snippet children({ gradient })}
							<Area y1={(d) => d.cpu} fill={gradient} line={{ class: "stroke-2 stroke-yellow" }} curve={curveBasis} />
						{/snippet}
					</LinearGradient>

					<Highlight lines={{ class: "stroke-peach [stroke-dasharray:unset]" }} />
					<Highlight y={(d) => d.ram} points={{ class: "fill-peach" }} />
					<Highlight y={(d) => d.cpu} points={{ class: "fill-yellow" }} />
				</Svg>

				<Tooltip.Root class="border border-peach bg-peach/10! text-white/85 backdrop-blur-lg!">
					{#snippet children({ data })}
						<Tooltip.Header value={data.timestamp} format="time" classes={{ root: "border-peach" }} />
						<Tooltip.List>
							<Tooltip.Item label="RAM (%)" value={data.ram} format="percentRound" classes={{ value: "font-mono font-black text-peach" }} />
							<Tooltip.Item label="CPU (%)" value={data.cpu} format="percentRound" classes={{ value: "font-mono font-black text-yellow" }} />
						</Tooltip.List>
					{/snippet}
				</Tooltip.Root>
			</Chart>
		</div>

		<div class="relative h-48 rounded-md bg-mantle border border-surface0 p-2 mt-2 shadow-sm">
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
					<Axis
						placement="left"
						rule
						classes={{ tickLabel: "fill-overlay1 font-medium stroke-none", rule: "stroke-surface0/50", tick: "stroke-surface0/50" }}
					/>
					<Axis
						placement="bottom"
						grid
						rule
						classes={{ tickLabel: "fill-overlay1 font-medium stroke-none", rule: "stroke-surface0/50", tick: "stroke-surface0/50" }}
					/>

					<!-- Keys -->
					<LinearGradient class="from-green/50 to-green/1" vertical>
						{#snippet children({ gradient })}
							<Area y1={(d) => d.keys} fill={gradient} line={{ class: "stroke-2 stroke-green" }} curve={curveBasis} />
						{/snippet}
					</LinearGradient>

					<!-- Clicks -->
					<LinearGradient class="from-teal/50 to-teal/1" vertical>
						{#snippet children({ gradient })}
							<Area y1={(d) => d.clicks} fill={gradient} line={{ class: "stroke-2 stroke-teal" }} curve={curveBasis} />
						{/snippet}
					</LinearGradient>

					<Highlight lines={{ class: "stroke-peach [stroke-dasharray:unset]" }} />
					<Highlight y={(d) => d.keys} points={{ class: "fill-green" }} />
					<Highlight y={(d) => d.clicks} points={{ class: "fill-teal" }} />
				</Svg>

				<Tooltip.Root classes={{ container: "border border-peach bg-peach/10! text-white/85 backdrop-blur-lg!" }}>
					{#snippet children({ data })}
						<Tooltip.Header value={data.timestamp} format="time" classes={{ root: "border-peach" }} />
						<Tooltip.List>
							<Tooltip.Item label="Keys" value={data.keys} classes={{ value: "font-mono font-black text-green" }} />
							<Tooltip.Item label="Clicks" value={data.clicks} classes={{ value: "font-mono font-black text-teal" }} />
						</Tooltip.List>
					{/snippet}
				</Tooltip.Root>
			</Chart>
		</div>
	</section>
</div>
