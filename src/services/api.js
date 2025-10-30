import axios from 'axios';

const API_BASE_URL =
	process.env.REACT_APP_API_BASE_URL ||
	'https://n1u3hvxmqf.execute-api.us-east-2.amazonaws.com/prod';

// Central axios instance with sensible defaults for the browser
export const apiClient = axios.create({
	baseURL: API_BASE_URL,
	timeout: 8000,
	headers: { 'Content-Type': 'application/json' },
});

export const getInventory = async () => {
	const response = await apiClient.get('/inventory');
	return response.data;
};

export const createOrder = async (order) => {
	const response = await apiClient.post('/order', order);
	return response.data;
};
