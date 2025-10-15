import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className="bg-blue-600 text-white p-4 shadow">
			<div className="container mx-auto flex justify-between items-center">
				<Link to="/" className="text-xl font-bold">
					PitStopProvisions
				</Link>
				<div className="flex space-x-4">
					<Link to="/products" className="hover:underline">
						Products
					</Link>
					<Link to="/about-us" className="hover:underline">
						About Us
					</Link>
					<Link to="/contact-us" className="hover:underline">
						Contact Us
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
