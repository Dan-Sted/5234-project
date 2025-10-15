import React from 'react';

const ContactUs = () => {
	return (
		<div className="min-h-screen flex flex-col">
			<main className="flex-grow bg-gray-50 p-6">
				<h1 className="text-3xl font-bold mb-6">Contact Us</h1>
				<section className="mb-8">
					<h2 className="text-2xl font-semibold mb-4">Support</h2>
					<p>Email: support@pitstopprovisions.com</p>
					<p>Phone: +1-800-555-1234</p>
				</section>
				<section className="mb-8">
					<h2 className="text-2xl font-semibold mb-4">Return Policy</h2>
					<p>
						Returns are accepted within 30 days of purchase. Please contact support for assistance.
					</p>
				</section>
				<section className="mb-8">
					<h2 className="text-2xl font-semibold mb-4">FAQ</h2>
					<p>Q: How do I track my order?</p>
					<p>A: You can track your order through the link provided in your confirmation email.</p>
				</section>
			</main>
		</div>
	);
};

export default ContactUs;
