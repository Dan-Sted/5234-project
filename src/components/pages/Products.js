import React from 'react';
import productlist, { productImages } from '../common/productlist';
import { useNavigate } from 'react-router-dom';

const Products = () => {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen flex flex-col">
			<main className="flex-grow bg-gray-50 p-6">
				<h1 className="text-3xl font-bold mb-6">Our Products</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{productlist.map((product) => (
						<div key={product.id} className="bg-white rounded-lg shadow p-4">
							<img
								src={productImages.get(product.id)}
								alt={product.name}
								className="w-full h-40 object-contain rounded-md mb-4"
							/>
							<h2 className="text-xl font-semibold">{product.name}</h2>
							<p className="text-gray-500">${product.price.toFixed(2)}</p>
						</div>
					))}
				</div>
			</main>
			<div className="fixed bottom-16 right-4">
				<button
					className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 shadow-lg"
					onClick={() => navigate('/purchase')}
				>
					Buy Now!
				</button>
			</div>
		</div>
	);
};

export default Products;
