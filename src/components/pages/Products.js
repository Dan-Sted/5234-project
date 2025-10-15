import React from 'react';
import productlist, { productImages } from '../common/productlist';
import { useNavigate } from 'react-router-dom';

const Products = () => {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen flex flex-col bg-secondary-bg">
			<main className="flex-grow p-6">
				<h1 className="text-3xl font-bold text-primary-text mb-6">Our Products</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{productlist.map((product) => (
						<div key={product.id} className="bg-primary-bg rounded-lg shadow p-4">
							<img
								src={productImages.get(product.id)}
								alt={product.name}
								className="w-full h-40 object-contain rounded-md mb-4"
							/>
							<h2 className="text-xl font-semibold text-primary-text">{product.name}</h2>
							<p className="text-secondary-text">${product.price.toFixed(2)}</p>
						</div>
					))}
				</div>
			</main>
			<div className="fixed bottom-16 right-4">
				<button
					className="bg-primary-bg text-primary-text py-2 px-4 rounded hover:bg-primary-bg-hover shadow-lg"
					onClick={() => navigate('/purchase')}
				>
					Buy Now!
				</button>
			</div>
		</div>
	);
};

export default Products;
