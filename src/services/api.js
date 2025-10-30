import axios from 'axios';

const API_BASE_URL = 'https://n1u3hvxmqf.execute-api.us-east-2.amazonaws.com/prod';

export const getInventory = async () => {
	const response = await axios.get(`${API_BASE_URL}/inventory`);
	return response.data;
};

export const createOrder = async (order) => {
	const response = await axios.post(`${API_BASE_URL}/order`, order);
	return response.data;
};
