import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productlist from '../../common/productlist';

const cardStyle = {
	margin: '0 auto',
	maxWidth: 500,
	minWidth: 300,
	width: '100%',
	padding: '2rem',
	boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
	borderRadius: '8px',
	background: '#fff',
};

const ViewOrder = () => {
	const location = useLocation();
	const navigate = useNavigate();

	// Extract order, payment, and shipping data from location state
	const order = location && location.state && location.state.order;
	const payment = location && location.state && location.state.payment;
	const shipping = location && location.state && location.state.shipping;

	// Calculate purchased items with quantities
	const purchased = useMemo(() => {
		if (!order) return [];
		return productlist
			.map((p, idx) => ({ ...p, qty: order.buyQuantity[idx] || 0 }))
			.filter((item) => item.qty > 0);
	}, [order]);

	const totalItems = purchased.reduce((s, it) => s + it.qty, 0);
	const totalPrice = purchased.reduce((sum, item) => sum + (item.price || 0) * item.qty, 0);

	const cardCn = payment.cardNumber;
	const cardExp = payment.expiration;
	const cardCvv = payment.cvv;
	const cardName = payment.cardholderName;

	const shipName = shipping.name;
	const shipAddress = shipping.addressLine1;
	const shipCity = shipping.city;
	const shipState = shipping.state;
	const shipZip = shipping.zip;

	const handleSubmit = (e) => {
		e.preventDefault();
		navigate('/purchase/confirmation', {
			state: {
				order: {
					...location.state.order,
					items: purchased.map((item) => ({
						name: item.name,
						quantity: item.qty,
						price: item.price,
					})),
				},
				payment: location.state.payment,
				shipping: location.state.shipping,
			},
		});
	};

	if (!shipping) {
		return <div>No shipping information available</div>;
	}

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: '2rem',
					marginTop: '2rem',
				}}
			>
				{/* Order Summary */}
				<div className="card" style={cardStyle}>
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
											<div className="text-sm text-gray-500">
												${item.price.toFixed(2)} × {item.qty}
											</div>
										</div>
										<div className="text-sm text-gray-700 font-semibold">
											${(item.price * item.qty).toFixed(2)}
										</div>
									</li>
								))}
							</ul>
						)}

						<div className="mt-4 flex justify-between items-center">
							<div className="text-gray-700">Total items</div>
							<div className="font-semibold">{totalItems}</div>
						</div>
						<div className="mt-2 flex justify-between items-center">
							<div className="text-gray-700 font-bold">Total Price</div>
							<div className="font-bold text-lg">${totalPrice.toFixed(2)}</div>
						</div>

						<div className="mt-6 flex justify-end">
							<button className="btn-primary" onClick={() => navigate(-3)}>
								Edit Order
							</button>
						</div>
					</div>
				</div>

				{/* Payment Information List */}
				<div className="card" style={cardStyle}>
					<h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Information</h2>
					<ul className="space-y-3">
						<li className="flex items-center">
							<span className="font-medium text-gray-700 w-40">Card Number:</span>
							<span className="text-gray-900">{cardCn}</span>
						</li>
						<li className="flex items-center">
							<span className="font-medium text-gray-700 w-40">Expiration:</span>
							<span className="text-gray-900">{cardExp}</span>
						</li>
						<li className="flex items-center">
							<span className="font-medium text-gray-700 w-40">CVV:</span>
							<span className="text-gray-900">{cardCvv}</span>
						</li>
						<li className="flex items-center">
							<span className="font-medium text-gray-700 w-40">Cardholder Name:</span>
							<span className="text-gray-900">{cardName}</span>
						</li>
					</ul>
				</div>

				{/* Shipping Information List */}
				<div className="card" style={cardStyle}>
					<h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Information</h2>
					<ul className="space-y-3">
						<li className="flex items-center">
							<span className="font-medium text-gray-700 w-40">Name:</span>
							<span className="text-gray-900">{shipName}</span>
						</li>
						<li className="flex items-center">
							<span className="font-medium text-gray-700 w-40">Address:</span>
							<span className="text-gray-900">{shipAddress}</span>
						</li>
						<li className="flex items-center">
							<span className="font-medium text-gray-700 w-40">City:</span>
							<span className="text-gray-900">{shipCity}</span>
						</li>
						<li className="flex items-center">
							<span className="font-medium text-gray-700 w-40">State:</span>
							<span className="text-gray-900">{shipState}</span>
						</li>
						<li className="flex items-center">
							<span className="font-medium text-gray-700 w-40">ZIP Code:</span>
							<span className="text-gray-900">{shipZip}</span>
						</li>
					</ul>
				</div>
				<form onSubmit={handleSubmit} className="card" style={cardStyle}>
					<div className="flex justify-center">
						<button type="submit" className="btn-primary">
							Continue to confirmation
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default ViewOrder;
