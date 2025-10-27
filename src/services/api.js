import axios from 'axios';

const API_BASE_URL = 'https://po0pow4923.execute-api.us-east-2.amazonaws.com/dev';

export const getInventory = async () => {
	console.log('getInventory called');
	const response = await axios.get(`${API_BASE_URL}/inventory`);
	return response.data;
};

export const createOrder = async (order) => {
	const response = await axios.post(`${API_BASE_URL}/order`, order);
	return response.data;
};
