interface ApiResponse {
	online: boolean;
	uptimeStart: number;
	totals: {
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
