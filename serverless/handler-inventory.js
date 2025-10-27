// in-memory inventory
const items = [
	{ id: 'helmet-cf', name: 'Racing Helmet - Carbon Fiber', price: 1199.99, quantity: 10 },
	{ id: 'suit-fire', name: 'Fire-Resistant Racing Suit', price: 899.99, quantity: 5 },
	{ id: 'brake-ceramic', name: 'Carbon Ceramic Brake Kit', price: 3499.99, quantity: 3 },
	{ id: 'wing-front', name: 'High-Downforce Front Wing', price: 2199.99, quantity: 2 },
	{ id: 'telemetry', name: 'Telemetry Data Logger', price: 1499.99, quantity: 4 },
];

// GET /inventory and GET /inventory/items?name=
module.exports.list = async (event) => {
	try {
		const query = event.queryStringParameters || {};
		const nameFilter = query.name ? String(query.name).toLowerCase() : null;
		const result = nameFilter
			? items.filter((i) => i.name.toLowerCase().includes(nameFilter))
			: items;
		return {
			statusCode: 200,
			headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
			body: JSON.stringify(result),
		};
	} catch (err) {
		return {
			statusCode: 500,
			headers: { 'Access-Control-Allow-Origin': '*' },
			body: JSON.stringify({ error: 'Internal error' }),
		};
	}
};
