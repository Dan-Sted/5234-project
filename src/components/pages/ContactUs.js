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
						Returns are accepted within 30 days of purchase. Please contact support for assistance.
					</p>
				</section>
				<section className="mb-8">
					<h2 className="text-2xl font-semibold text-primary-text mb-4">FAQ</h2>
					<p className="text-secondary-text">Q: How do I track my order?</p>
					<p className="text-secondary-text">
						A: You can track your order through the link provided in your confirmation email.
					</p>
				</section>
			</main>
		</div>
	);
};

export default ContactUs;
