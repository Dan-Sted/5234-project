const items = [
	{ id: 'helmet-cf', name: 'Racing Helmet - Carbon Fiber', price: 1199.99, quantity: 10 },
	{ id: 'suit-fire', name: 'Fire-Resistant Racing Suit', price: 899.99, quantity: 5 },
	{ id: 'brake-ceramic', name: 'Carbon Ceramic Brake Kit', price: 3499.99, quantity: 3 },
	{ id: 'wing-front', name: 'High-Downforce Front Wing', price: 2199.99, quantity: 2 },
	{ id: 'telemetry', name: 'Telemetry Data Logger', price: 1499.99, quantity: 4 },
];

module.exports.getById = async (event) => {
	try {
		const id =
			(event.pathParameters && event.pathParameters.id) ||
			(event.path && event.path.split('/').pop()) ||
			(event.queryStringParameters && event.queryStringParameters.id);

		console.log('getById (separate lambda) called for id:', id);

		if (!id) {
			return {
				statusCode: 400,
				headers: { 'Access-Control-Allow-Origin': '*' },
				body: JSON.stringify({ error: 'Missing id parameter' }),
			};
		}

		const item = items.find((i) => i.id === id);
		if (!item) {
			return {
				statusCode: 404,
				headers: { 'Access-Control-Allow-Origin': '*' },
				body: JSON.stringify({ error: 'Not found' }),
			};
		}

		return {
			statusCode: 200,
			headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
			body: JSON.stringify(item),
		};
	} catch (err) {
		console.error('inventory getById error', err);
		return {
			statusCode: 500,
			headers: { 'Access-Control-Allow-Origin': '*' },
			body: JSON.stringify({ error: 'Internal error' }),
		};
	}
};
