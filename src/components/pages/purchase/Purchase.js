import React, { useEffect, useState } from 'react';
import { getInventory, createOrder } from '../../../services/api';

const Purchase = () => {
	const [inventory, setInventory] = useState([]);
	const [order, setOrder] = useState({
		buyQuantity: [],
	});

	useEffect(() => {
		const fetchInventory = async () => {
			console.log('fetchInventory called');
			try {
				const data = await getInventory();
				console.log('Fetched Inventory:', data);
				setInventory(data);
				setOrder((prevOrder) => ({
					...prevOrder,
					buyQuantity: Array(data.length).fill(0),
				}));
			} catch (error) {
				console.error('Error fetching inventory:', error);
			}
		};
		fetchInventory();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await createOrder({
				items: inventory.map((item, idx) => ({
					id: item.id,
					quantity: order.buyQuantity[idx],
				})),
			});
			alert(`Order placed! Confirmation: ${response.confirmationNumber}`);
		} catch (error) {
			if (error.response && error.response.status === 409) {
				const { itemId, requested, available } = error.response.data;
				alert(`Conflict: Item ${itemId} requested ${requested}, but only ${available} available.`);
			} else {
				alert('An error occurred while placing the order.');
			}
		}
	};

	return (
		<div className="min-h-screen bg-secondary-bg p-6">
			<div className="max-w-2xl mx-auto">
				<h1 className="text-2xl text-center font-semibold text-primary-text mb-4">
					PitStopProvisions Products
				</h1>
				<form onSubmit={handleSubmit} className="grid gap-6">
					<div className="grid grid-cols-1 gap-4">
						{inventory.map((product, idx) => (
							<div
								key={product.id}
								className="bg-primary-bg rounded-lg shadow p-4 flex items-center justify-between gap-x-4"
							>
								<img
									src={product.image}
									alt={product.name}
									className="w-20 h-20 object-cover rounded-md mr-6"
								/>
								<div className="text-left flex-1">
									<div className="font-medium text-primary-text">{product.name}</div>
									<div className="text-sm text-secondary-text">${product.price.toFixed(2)}</div>
								</div>
								<div className="flex items-center gap-3">
									<button
										type="button"
										aria-label={`remove one ${product.name}`}
										className="h-12 w-12 flex items-center justify-center rounded-full bg-secondary-bg hover:bg-secondary-text text-primary-text shadow"
										onClick={() =>
											setOrder((prevOrder) => {
												const newQuantity = [...prevOrder.buyQuantity];
												newQuantity[idx] = Math.max(0, newQuantity[idx] - 1);
												return { ...prevOrder, buyQuantity: newQuantity };
											})
										}
									>
										-
									</button>
									<input
										type="number"
										min="0"
										className="w-20 text-center rounded border-secondary-text shadow-sm no-spinner"
										value={order.buyQuantity[idx] ?? 0}
										onChange={(e) =>
											setOrder((prevOrder) => {
												const newQuantity = [...prevOrder.buyQuantity];
												newQuantity[idx] = parseInt(e.target.value, 10) || 0;
												return { ...prevOrder, buyQuantity: newQuantity };
											})
										}
									/>
									<button
										type="button"
										aria-label={`add one ${product.name}`}
										className="h-12 w-12 flex items-center justify-center rounded-full bg-primary-bg hover:bg-primary-bg-hover text-primary-text shadow"
										onClick={() =>
											setOrder((prevOrder) => {
												const newQuantity = [...prevOrder.buyQuantity];
												newQuantity[idx] = newQuantity[idx] + 1;
												return { ...prevOrder, buyQuantity: newQuantity };
											})
										}
									>
										+
									</button>
								</div>
							</div>
						))}
					</div>
					<div className="flex justify-end mt-4">
						<div className="text-lg font-bold text-primary-text">
							Total Price: $
							{inventory
								.reduce(
									(total, product, idx) => total + product.price * (order.buyQuantity[idx] || 0),
									0
								)
								.toFixed(2)}
						</div>
					</div>
					<div className="flex justify-end">
						<button
							type="submit"
							className="btn-primary disabled:opacity-50"
							disabled={!order.buyQuantity.some((qty) => qty > 0)}
						>
							Continue to Payment
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Purchase;
