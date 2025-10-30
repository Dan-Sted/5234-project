import axios from 'axios';
import http from 'http';
import https from 'https';

// Use environment variable when available so this is configurable per env
const API_BASE_URL =
	process.env.REACT_APP_API_BASE_URL ||
	'https://n1u3hvxmqf.execute-api.us-east-2.amazonaws.com/prod';

// Keep-alive agents to reuse TCP/TLS connections and reduce per-request latency
const agentOptions = { keepAlive: true, maxSockets: 50 };
const httpAgent = new http.Agent(agentOptions);
const httpsAgent = new https.Agent(agentOptions);

// Central axios instance with sensible defaults
export const apiClient = axios.create({
	baseURL: API_BASE_URL,
	timeout: 8000,
	httpAgent,
	httpsAgent,
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
