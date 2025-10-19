const productlist = [
	{ id: 'helmet-cf', name: 'Racing Helmet - Carbon Fiber', price: 1199.99 },
	{ id: 'suit-fire', name: 'Fire-Resistant Racing Suit', price: 899.99 },
	{ id: 'brake-ceramic', name: 'Carbon Ceramic Brake Kit', price: 3499.99 },
	{ id: 'wing-front', name: 'High-Downforce Front Wing', price: 2199.99 },
	{ id: 'telemetry', name: 'Telemetry Data Logger', price: 1499.99 },
];

export const productImages = new Map([
	['helmet-cf', require('../images/Racing Helmet - Carbon Fiber.jpg')],
	['suit-fire', require('../images/racing_suit.jpg')],
	['brake-ceramic', require('../images/Carbon Ceramic Brake Kit.jpg')],
	['wing-front', require('../images/High-Downforce Front Wing.jpg')],
	['telemetry', require('../images/Telemetry Data Logger.jpg')],
]);

export default productlist;
