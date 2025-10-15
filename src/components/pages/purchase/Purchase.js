import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import productlist, { productImages } from '../../common/productlist';

const Purchase = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const [order, setOrder] = useState({
		buyQuantity: Array(productlist.length).fill(0),
	});

	useEffect(() => {
		if (location.state?.order) {
			setOrder(location.state.order);
		}
	}, [location.state?.order]);

	const handleSubmit = (e) => {
		e.preventDefault();
		// send the order inside the navigation state so PaymentEntry can read it
		navigate('/purchase/paymentEntry', { state: { order } });
	};

	const handleQuantityChange = (index, value) => {
		setOrder((prev) => {
			const q = [...prev.buyQuantity];
			const num = Number(value) || 0;
			q[index] = Math.max(0, Math.floor(num));
			return { ...prev, buyQuantity: q };
		});
	};

	const productList = useMemo(() => productlist, []);

	const anySelected = order.buyQuantity.some((q) => q > 0);

	const totalPrice = productList.reduce(
		(sum, product, idx) => sum + (product.price || 0) * (order.buyQuantity[idx] || 0),
		0
	);

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="max-w-2xl mx-auto">
				<h1 className="text-2xl text-center font-semibold mb-4">PitStopProvisions Products</h1>

				<form onSubmit={handleSubmit} className="grid gap-6">
					<div className="grid grid-cols-1 gap-4">
						{productList.map((product, idx) => (
							<div
								key={product.id || product.name}
								className="bg-white rounded-lg shadow p-4 flex items-center justify-between gap-x-4"
							>
								<img
									src={productImages.get(product.id)}
									alt={product.name}
									className="w-20 h-20 object-cover rounded-md mr-6"
								/>
								<div className="text-left flex-1">
									<div className="font-medium text-left">{product.name}</div>
									<div className="text-sm text-gray-500 text-left">${product.price.toFixed(2)}</div>
								</div>
								<div className="flex items-center gap-3">
									<button
										type="button"
										aria-label={`remove one ${product.name}`}
										className="h-12 w-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 shadow"
										onClick={() => handleQuantityChange(idx, (order.buyQuantity[idx] || 0) - 1)}
									>
										-
									</button>

									<input
										type="number"
										min="0"
										className="w-20 text-center rounded border-gray-200 shadow-sm no-spinner"
										value={order.buyQuantity[idx] ?? 0}
										onChange={(e) => handleQuantityChange(idx, e.target.value)}
									/>

									<button
										type="button"
										aria-label={`add one ${product.name}`}
										className="h-12 w-12 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow"
										onClick={() => handleQuantityChange(idx, (order.buyQuantity[idx] || 0) + 1)}
									>
										+
									</button>
								</div>
							</div>
						))}
					</div>

					{/* Total Price Section */}
					<div className="flex justify-end mt-4">
						<div className="text-lg font-bold">Total Price: ${totalPrice.toFixed(2)}</div>
					</div>

					<div className="flex justify-end">
						<button
							type="submit"
							className="btn-primary disabled:opacity-50"
							disabled={!anySelected}
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
