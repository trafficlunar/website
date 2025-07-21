type ComputerData = {
	data: ApiResponse | undefined;
};

// prevents sending 2 requests to the same route in my API
// check Online.svelte for where data is fetched
export let computerData = $state<ComputerData>({
	data: undefined,
});
