import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productlist from './productlist';

const cardStyle = {
	margin: '2rem auto',
	maxWidth: 500,
	minWidth: 300,
	width: '100%',
	padding: '2rem',
	boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
	borderRadius: '8px',
	background: '#fff',
};

const Confirmation = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const order = location && location.state && location.state.order;
	const payment = location && location.state && location.state.payment;
	const shipping = location && location.state && location.state.shipping;

	const confirmationNumber = 1234;

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			{/* confirmation*/}
			<div className="card" style={cardStyle}>
				<h2 className="text-xl font-semibold text-gray-900 mb-4">Order Confirmation</h2>
				<div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
					<div className="font-medium text-gray-700" style={{ fontSize: '1.1rem' }}>
						Confirmation Number:
					</div>
					<div
						className="text-gray-900"
						style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}
					>
						{confirmationNumber}
					</div>
					<div className="text-gray-900" style={{ fontSize: '1.1rem' }}>
						Thank you for placing an order!
					</div>
				</div>

				<h3 className="text-lg font-semibold text-gray-800 mt-4">Items Purchased</h3>
				<ul style={{ paddingLeft: '1.2em' }}>
					{order && order.items && order.items.length > 0 ? (
						order.items.map((item, idx) => (
							<li key={idx} className="text-gray-700">
								{item.name} {item.quantity ? `x${item.quantity}` : ''}
								{item.price ? ` - $${item.price}` : ''}
							</li>
						))
					) : (
						<li className="text-gray-500">No items found.</li>
					)}
				</ul>

				<h3 className="text-lg font-semibold text-gray-800 mt-4">Shipping Information</h3>
				<p className="text-gray-700">{shipping.name}</p>
				<p className="text-gray-700">{shipping.address}</p>
				<p className="text-gray-700">{`${shipping.city}, ${shipping.state} ${shipping.zip}`}</p>

				<h3 className="text-lg font-semibold text-gray-800 mt-4">Payment Information</h3>
				<p className="text-gray-700">{`Card ending in ${payment.cardNumber.slice(-4)}`}</p>
			</div>
		</div>
	);
};
export default Confirmation;
