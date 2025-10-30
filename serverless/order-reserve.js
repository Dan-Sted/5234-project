const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();

function makeConfirmation() {
	return `CONF-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

// Helper to invoke inventory-get-item Lambda
async function getInventoryItem(functionName, id) {
	const payload = { pathParameters: { id } };
	const res = await lambda
		.invoke({
			FunctionName: functionName,
			Payload: JSON.stringify(payload),
			InvocationType: 'RequestResponse',
		})
		.promise();
	if (res.FunctionError) {
		const body = res.Payload ? JSON.parse(res.Payload) : null;
		throw new Error('Inventory function error: ' + JSON.stringify(body));
	}
	const body = res.Payload ? JSON.parse(res.Payload) : null;
	// If API-style response (statusCode/body), support that shape
	if (body && body.statusCode) {
		if (body.statusCode === 404) return { notFound: true };
		if (body.statusCode >= 400) throw new Error('Inventory function returned error');
		return JSON.parse(body.body || '{}');
	}
	return body;
}

module.exports.createOrder = async (event) => {
	try {
		const body = JSON.parse(event.body || '{}');

		if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
			return {
				statusCode: 400,
				headers: { 'Access-Control-Allow-Origin': '*' },
				body: JSON.stringify({ error: 'Invalid items' }),
			};
		}

		const INVENTORY_GET_FN = process.env.INVENTORY_GET_FUNCTION_NAME;
		const INVENTORY_LIST_FN = process.env.INVENTORY_LIST_FUNCTION_NAME;

		if (!INVENTORY_GET_FN || !INVENTORY_LIST_FN) {
			return {
				statusCode: 500,
				headers: { 'Access-Control-Allow-Origin': '*' },
				body: JSON.stringify({ error: 'Inventory function names not configured' }),
			};
		}

		const insufficient = [];
		for (const it of body.items) {
			const id = it.id;
			const qtyReq = Number(it.quantity || 0);
			// invoke inventory-get-item lambda
			const item = await getInventoryItem(INVENTORY_GET_FN, id);
			if (!item || item.notFound) {
				insufficient.push({ id, requested: qtyReq, available: 0 });
				continue;
			}
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
		console.error('createOrder error', err);
		return {
			statusCode: 500,
			headers: { 'Access-Control-Allow-Origin': '*' },
			body: JSON.stringify({ error: 'Internal error' }),
		};
	}
};
