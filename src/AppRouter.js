import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Products from './components/pages/Products';
import AboutUs from './components/pages/AboutUs';
import ContactUs from './components/pages/ContactUs';
import Purchase from './components/pages/purchase/Purchase';
import PaymentEntry from './components/pages/purchase/paymentEntry';
import ShippingEntry from './components/pages/purchase/shippingEntry';
import ViewOrder from './components/pages/purchase/viewOrder';
import Confirmation from './components/pages/purchase/confirmation';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

const AppRouter = () => {
	return (
		<Router>
			<div className="flex flex-col min-h-screen">
				<Navbar />
				<div className="flex-grow">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/products" element={<Products />} />
						<Route path="/about-us" element={<AboutUs />} />
						<Route path="/contact-us" element={<ContactUs />} />
						<Route path="/purchase" element={<Purchase />} />
						<Route path="/purchase/paymentEntry" element={<PaymentEntry />} />
						<Route path="/purchase/shippingEntry" element={<ShippingEntry />} />
						<Route path="/purchase/viewOrder" element={<ViewOrder />} />
						<Route path="/purchase/confirmation" element={<Confirmation />} />
					</Routes>
				</div>
				<Footer />
			</div>
		</Router>
	);
};

export default AppRouter;
