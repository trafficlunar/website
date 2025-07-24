interface ApiResponse {
	online: boolean;
	uptimeStart: number;
	totals: {
		uptime: number;
		keys: number;
		clicks: number;
	};
	graph: {
		timestamp: string;
		cpu: number;
		ram: number;
		keys: number;
		clicks: number;
	}[];
}
