import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
	const location = useLocation();

	return (
		<nav className="bg-primary-bg text-primary-text p-4 shadow">
			<div className="container mx-auto flex justify-between items-center">
				<Link to="/" className="text-xl font-bold">
					PitStopProvisions
				</Link>
				<div className="flex space-x-4">
					<Link
						to="/purchase"
						className={`hover:underline font-semibold text-primary-bg-hover ${location.pathname === '/purchase' ? 'font-extrabold' : ''}`}
					>
						Buy Now
					</Link>
					<Link
						to="/products"
						className={`hover:underline ${location.pathname === '/products' ? 'font-bold' : ''}`}
					>
						Products
					</Link>
					<Link
						to="/about-us"
						className={`hover:underline ${location.pathname === '/about-us' ? 'font-bold' : ''}`}
					>
						About Us
					</Link>
					<Link
						to="/contact-us"
						className={`hover:underline ${location.pathname === '/contact-us' ? 'font-bold' : ''}`}
					>
						Contact Us
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
