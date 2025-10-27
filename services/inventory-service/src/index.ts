import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

// Enable CORS
app.use(cors());

// In-memory inventory array
const inventory = [
	{ id: 1, name: 'Item A', description: 'Description of Item A' },
	{ id: 2, name: 'Item B', description: 'Description of Item B' },
	{ id: 3, name: 'Item C', description: 'Description of Item C' },
];

// GET /inventory - Returns all items
app.get('/inventory', (req, res) => {
	res.json(inventory);
});

// GET /inventory/items/:id - Returns item by ID or 404
app.get('/inventory/items/:id', (req, res) => {
	const id = parseInt(req.params.id, 10);
	const item = inventory.find((item) => item.id === id);
	if (item) {
		res.json(item);
	} else {
		res.status(404).send({ error: 'Item not found' });
	}
});

// GET /inventory/items - Filter by name substring (case-insensitive)
app.get('/inventory/items', (req, res) => {
	const name = req.query.name?.toString().toLowerCase();
	if (name) {
		const filteredItems = inventory.filter((item) => item.name.toLowerCase().includes(name));
		res.json(filteredItems);
	} else {
		res.json(inventory);
	}
});

// Start the server
app.listen(port, () => {
	console.log(`Inventory service is running on http://localhost:${port}`);
});
