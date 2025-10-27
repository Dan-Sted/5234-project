const fetch = require('node-fetch');

function makeConfirmation() {
	return `CONF-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

module.exports.create = async (event) => {
	try {
		const body = JSON.parse(event.body || '{}');

		if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
			return {
				statusCode: 400,
				headers: { 'Access-Control-Allow-Origin': '*' },
				body: JSON.stringify({ error: 'Invalid items' }),
			};
		}

		const INVENTORY_API = process.env.INVENTORY_API;

		if (!INVENTORY_API) {
			return {
				statusCode: 500,
				headers: { 'Access-Control-Allow-Origin': '*' },
				body: JSON.stringify({ error: 'INVENTORY_API not configured' }),
			};
		}

		const insufficient = [];
		for (const it of body.items) {
			const id = it.id;
			const qtyReq = Number(it.quantity || 0);
			const res = await fetch(`${INVENTORY_API}/inventory/items/${id}`);
			if (res.status === 404) {
				insufficient.push({ id, requested: qtyReq, available: 0 });
				continue;
			}
			if (!res.ok) {
				return {
					statusCode: 502,
					headers: { 'Access-Control-Allow-Origin': '*' },
					body: JSON.stringify({ error: 'Inventory service error' }),
				};
			}
			const item = await res.json();
			if ((item.quantity || 0) < qtyReq) {
				insufficient.push({ id, requested: qtyReq, available: item.quantity || 0 });
			}
		}

		if (insufficient.length > 0) {
			return {
				statusCode: 409,
				headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
				body: JSON.stringify({ error: 'Insufficient quantity', items: insufficient }),
			};
		}

		const confirmation = makeConfirmation();
		return {
			statusCode: 201,
			headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
			body: JSON.stringify({ confirmation }),
		};
	} catch (err) {
		return {
			statusCode: 500,
			headers: { 'Access-Control-Allow-Origin': '*' },
			body: JSON.stringify({ error: 'Internal error' }),
		};
	}
};
