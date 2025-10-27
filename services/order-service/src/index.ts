import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const port = 3002;

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// POST /order - Process an order
app.post('/order', async (req, res) => {
	const { customer, items, payment, shipping } = req.body;
	const inventoryBaseUrl = process.env.INVENTORY_BASE_URL;

	if (!inventoryBaseUrl) {
		return res.status(500).send({ error: 'INVENTORY_BASE_URL is not set' });
	}

	try {
		for (const item of items) {
			const response = await axios.get(`${inventoryBaseUrl}/inventory/items/${item.id}`);
			const inventoryItem = response.data;

			if (inventoryItem.quantity < item.quantity) {
				return res.status(409).send({
					error: 'Insufficient quantity',
					itemId: item.id,
					requested: item.quantity,
					available: inventoryItem.quantity,
				});
			}
		}

		const confirmationNumber = `CONF-${Date.now()}`;
		res.status(201).send({ confirmationNumber });
	} catch (error) {
		console.error(error);
		res.status(500).send({ error: 'An error occurred while processing the order' });
	}
});

// Start the server
app.listen(port, () => {
	console.log(`Order service is running on http://localhost:${port}`);
});
