import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productlist from './productlist';

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
			<div className="bg-white rounded-lg shadow-md p-6">
				<h2 className="text-xl font-semibold text-gray-900 mb-4">Order Confirmation</h2>
				<ul className="space-y-3">
					<li className="flex items-center">
						<span className="font-medium text-gray-700 w-40">Confirmation Number:</span>
						<span className="text-gray-900">{confirmationNumber}</span>
					</li>
					<li className="flex items-center">
						<span className="text-gray-900">Thank you for placing an order!</span>
					</li>
				</ul>
			</div>
		</div>
	);
};
export default Confirmation;
