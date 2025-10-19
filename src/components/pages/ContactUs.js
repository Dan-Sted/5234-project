import React from 'react';

const ContactUs = () => {
	return (
		<div className="min-h-screen flex flex-col bg-secondary-bg">
			<main className="flex-grow p-6">
				<h1 className="text-3xl font-bold text-primary-text mb-6">Contact Us</h1>
				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-primary-text mb-4">Support</h2>
					<p className="text-secondary-text">Email: support@pitstopprovisions.com</p>
					<p className="text-secondary-text">Phone: +1-800-555-1234</p>
				</section>
				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-primary-text mb-4">Return Policy</h2>
					<p className="text-secondary-text">
						All products may be returned within 30 days of delivery for a full refund or exchange.
						We believe you should have adequate time to inspect, test-fit, and evaluate your parts
						before committing to keep them. For unused products in original packaging with all
						documentation and accessories, we'll process your return with no questions asked.
					</p>
				</section>
				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-primary-text mb-4">FAQ</h2>
					<p className="text-secondary-text">Q: How do I track my order?</p>
					<p className="text-secondary-text">
						A: You can track your order through the link provided in your confirmation email.
					</p>
					<p className="text-secondary-text">Q: What happens if I receive a defective product?</p>
					<p className="text-secondary-text">
						A: If you receive a defective or damaged product, contact us immediately. We'll arrange
						free return shipping and provide either a replacement or full refund with absolutely no
						restocking fees.
					</p>
					<p className="text-secondary-text">Q: What payment methods do you accept?</p>
					<p className="text-secondary-text">
						A: We accept all major credit cards (Visa, Mastercard, American Express, Discover),
						PayPal, Apple Pay, Google Pay, and Venmo. For professional racing teams and high-volume
						customers, we offer net-30 payment terms through our Racing Pro Account program—simply
						apply online or contact our commercial sales team.
					</p>
				</section>
			</main>
		</div>
	);
};

export default ContactUs;
