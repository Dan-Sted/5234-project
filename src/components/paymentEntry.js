import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productlist from './productlist';

const PaymentEntry = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const [payment, setPayment] = useState({
		cardNumber: '',
		expiration: '',
		cvv: '',
		cardholderName: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setPayment({ ...payment, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		navigate('/purchase/shippingEntry', {
			state: { order: location.state.order, payment },
		});
	};

	const order = location && location.state && location.state.order;

	const purchased = useMemo(() => {
		if (!order) return [];
		return productlist
			.map((p, idx) => ({ ...p, qty: order.buyQuantity[idx] || 0 }))
			.filter((item) => item.qty > 0);
	}, [order]);

	if (!order) {
		// redirect back to purchase if no order state
		navigate('/purchase');
		return null;
	}

	const totalItems = purchased.reduce((s, it) => s + it.qty, 0);

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			{/* Order Summary */}
			<div className="max-w-3xl mx-auto">
				<h1 className="text-2xl font-semibold mb-4">Order Summary</h1>

				<div className="card">
					{purchased.length === 0 ? (
						<p className="text-gray-600">No items selected.</p>
					) : (
						<ul className="divide-y">
							{purchased.map((item) => (
								<li key={item.id} className="py-3 flex justify-between items-center">
									<div>
										<div className="font-medium">{item.name}</div>
										{item.price != null && (
											<div className="text-sm text-gray-500">${item.price.toFixed(2)}</div>
										)}
									</div>
									<div className="text-sm text-gray-700">{item.qty} ×</div>
								</li>
							))}
						</ul>
					)}

					<div className="mt-4 flex justify-between items-center">
						<div className="text-gray-700">Total items</div>
						<div className="font-semibold">{totalItems}</div>
					</div>

					<div className="mt-6 flex justify-end">
						<button className="btn-primary" onClick={() => navigate(-1)}>
							Edit Order
						</button>
					</div>
				</div>
			</div>

			{/* Payment form sits in its own max-width container to match Order Summary */}
			<div className="max-w-3xl mx-auto mt-6">
				<form onSubmit={handleSubmit} className="card">
					<h2 className="text-lg font-medium mb-4">Payment Information</h2>
					<div className="space-y-4">
						<div className="flex items-center gap-4">
							<label className="w-36 sm:w-40 text-sm font-medium text-gray-700">Card Number:</label>
							<input
								type="text"
								name="cardNumber"
								placeholder="1234 1234 1234 1234"
								value={payment.cardNumber}
								onChange={handleChange}
								className="flex-1 rounded border-gray-200 shadow-sm p-2"
							/>
						</div>

						<div className="flex items-center gap-4">
							<label className="w-36 sm:w-40 text-sm font-medium text-gray-700">Expiration:</label>
							<input
								type="text"
								name="expiration"
								placeholder="MM/YY"
								value={payment.expiration}
								onChange={handleChange}
								className="flex-1 rounded border-gray-200 shadow-sm p-2"
							/>
						</div>

						<div className="flex items-center gap-4">
							<label className="w-36 sm:w-40 text-sm font-medium text-gray-700">CVV:</label>
							<input
								type="text"
								name="cvv"
								placeholder="123"
								value={payment.cvv}
								onChange={handleChange}
								className="flex-1 rounded border-gray-200 shadow-sm p-2"
							/>
						</div>

						<div className="flex items-center gap-4">
							<label className="w-36 sm:w-40 text-sm font-medium text-gray-700">Cardholder Name:</label>
							<input
								type="text"
								name="cardholderName"
								placeholder="Name on card"
								value={payment.cardholderName}
								onChange={handleChange}
								className="flex-1 rounded border-gray-200 shadow-sm p-2"
							/>
						</div>
					</div>

					<div className="mt-6 flex justify-end">
						<button type="submit" className="btn-primary">
							Continue to Shipping
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default PaymentEntry;
