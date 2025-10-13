import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ShippingEntry = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const [shipping, setShipping] = useState({
		name: '',
		addressLine1: '',
		addressLine2: '',
		city: '',
		state: '',
		zip: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setShipping({ ...shipping, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		navigate('/purchase/viewOrder', {
			state: {
				order: location.state.order,
				payment: location.state.payment,
				shipping,
			},
		});
	};

	return (
		<div>
			<h1>Shipping Information</h1>
			<form onSubmit={handleSubmit}>
				<label>Name:</label>
				<input
					type="text"
					name="name"
					placeholder="Full Name"
					value={shipping.name}
					onChange={handleChange}
				/>

				<label>Address Line 1:</label>
				<input
					type="text"
					name="addressLine1"
					placeholder="Address Line 1"
					value={shipping.addressLine1}
					onChange={handleChange}
				/>

				<label>Address Line 2:</label>
				<input
					type="text"
					name="addressLine2"
					placeholder="Address Line 2"
					value={shipping.addressLine2}
					onChange={handleChange}
				/>

				<label>City:</label>
				<input
					type="text"
					name="city"
					placeholder="City"
					value={shipping.city}
					onChange={handleChange}
				/>

				<label>State:</label>
				<input
					type="text"
					name="state"
					placeholder="State"
					value={shipping.state}
					onChange={handleChange}
				/>

				<label>ZIP Code:</label>
				<input
					type="text"
					name="zip"
					placeholder="ZIP Code"
					value={shipping.zip}
					onChange={handleChange}
				/>

				<button type="submit">Continue to Review Order</button>
			</form>
		</div>
	);
};

export default ShippingEntry;
