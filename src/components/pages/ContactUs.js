import React, { useState } from 'react';

const faqs = [
	{
		id: 1,
		q: 'How do I track my order?',
		a: 'You can track your order through the link provided in your confirmation email. If you need additional help, contact support and provide your order number.',
	},
	{
		id: 2,
		q: 'What happens if I receive a defective product?',
		a: "If you receive a defective or damaged product, contact us immediately. We'll arrange free return shipping and provide either a replacement or full refund with no restocking fees.",
	},
	{
		id: 3,
		q: 'What payment methods do you accept?',
		a: 'We accept major credit cards (Visa, Mastercard, AmEx), PayPal, Apple Pay, Google Pay, and Venmo. For commercial accounts we offer net-30 terms on approval.',
	},
	{
		id: 4,
		q: 'Do you ship internationally?',
		a: 'Yes — we ship worldwide. International orders may be subject to duties, taxes, and longer delivery windows depending on destination and customs processing. Shipping costs and estimates are shown at checkout.',
	},
	{
		id: 5,
		q: 'How do I know a part will fit my car?',
		a: 'Each product page includes fitment notes and compatible models where available. If you are unsure, check the product fitment table, contact support with your chassis/season/year, or request an expert fitment check prior to purchase.',
	},
	{
		id: 6,
		q: 'Are these genuine OEM parts or aftermarket?',
		a: 'We sell a mix of genuine OEM and high-quality aftermarket performance parts. Product pages clearly indicate whether an item is OEM, licensed, or an aftermarket performance component. If you need confirmation, contact support with the product SKU.',
	},
	{
		id: 7,
		q: 'Do you offer bulk/team pricing or pro accounts?',
		a: 'Yes — we offer Racing Pro Accounts for teams and high-volume buyers. Apply via our contact form or email sales@pitstopprovisions.com to discuss net terms, volume discounts, and dedicated support.',
	},
	{
		id: 8,
		q: 'Can I return apparel or custom merchandise?',
		a: 'Apparel and standard merchandise are returnable within 30 days if unworn and in original condition. Custom or personalized items (e.g., bespoke livery shirts) are final sale unless faulty — contact us for exceptions.',
	},
	{
		id: 9,
		q: 'How long will my order take to arrive?',
		a: 'Domestic delivery typically takes 2–5 business days depending on the shipping method selected. International delivery times vary by country; expedited options are available at checkout.',
	},
	{
		id: 10,
		q: 'Do you provide installation guidance or tech support?',
		a: 'We provide basic installation guides and technical notes on many product pages. For advanced installation help, we can connect you with partner shops or provide phone/email support from our technical team.',
	},
	{
		id: 11,
		q: 'How can I request a custom livery or team-branded merchandise?',
		a: 'For custom or team-branded merchandise, email merch@pitstopprovisions.com with your requirements, quantities, and artwork. Our team will provide a quote and production timeline.',
	},
];

const ContactUs = () => {
	const [openId, setOpenId] = useState(null);
	const [form, setForm] = useState({ name: '', email: '', message: '' });
	const [submitted, setSubmitted] = useState(false);

	const toggle = (id) => setOpenId(openId === id ? null : id);

	const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

	const handleSubmit = (e) => {
		e.preventDefault();
		// No backend — simulate submit
		setSubmitted(true);
		setForm({ name: '', email: '', message: '' });
		setTimeout(() => setSubmitted(false), 4000);
	};

	return (
		<div className="min-h-screen flex flex-col bg-secondary-bg">
			<main className="flex-grow p-6">
				<div className="max-w-6xl mx-auto">
					{/* Hero */}
					<header className="mb-8">
						<h1 className="text-4xl font-bold text-primary-text mb-2">Get in touch</h1>
						<p className="text-secondary-text">
							Questions about orders, returns, or products? We're here to help.
						</p>
					</header>

					{/* Contact cards + form */}
					<section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
						<div className="bg-primary-bg rounded-lg p-6 shadow">
							<h2 className="text-xl font-semibold text-primary-text mb-2">Support</h2>
							<p className="text-secondary-text mb-2">
								Email:{' '}
								<a className="underline" href="mailto:support@pitstopprovisions.com">
									support@pitstopprovisions.com
								</a>
							</p>
							<p className="text-secondary-text mb-2">
								Phone:{' '}
								<a className="underline" href="tel:+18005551234">
									+1-800-555-1234
								</a>
							</p>
							<p className="text-secondary-text">Hours: Mon–Fri, 9am–6pm ET</p>
						</div>

						<div className="bg-primary-bg rounded-lg p-6 shadow">
							<h2 className="text-xl font-semibold text-primary-text mb-2">Returns & Shipping</h2>
							<p className="text-secondary-text mb-2">
								30-day returns, free return shipping on defective items.
							</p>
							<p className="text-secondary-text">
								Need to start a return? Use the returns link on your order page or contact support.
							</p>
						</div>

						<div className="bg-primary-bg rounded-lg p-6 shadow">
							<h2 className="text-xl font-semibold text-primary-text mb-2">Send us a message</h2>
							<form onSubmit={handleSubmit} className="space-y-3">
								<input
									name="name"
									value={form.name}
									onChange={handleChange}
									placeholder="Your name"
									className="w-full p-2 rounded border border-secondary-text bg-transparent text-primary-text"
								/>
								<input
									name="email"
									value={form.email}
									onChange={handleChange}
									placeholder="you@race.com"
									className="w-full p-2 rounded border border-secondary-text bg-transparent text-primary-text"
								/>
								<textarea
									name="message"
									value={form.message}
									onChange={handleChange}
									placeholder="How can we help?"
									className="w-full p-2 rounded border border-secondary-text bg-transparent text-primary-text h-24"
								/>
								<div className="flex items-center gap-3">
									<button
										className="bg-primary-bg text-primary-text py-2 px-4 rounded"
										type="submit"
									>
										Send
									</button>
									{submitted && (
										<span className="text-sm text-green-500">Message sent (simulated)</span>
									)}
								</div>
							</form>
						</div>
					</section>

					{/* Return policy summary */}
					<section className="mb-8">
						<h2 className="text-2xl font-semibold text-primary-text mb-4">Return Policy</h2>
						<p className="text-secondary-text">
							All products may be returned within 30 days of delivery for a full refund or exchange.
							We believe you should have adequate time to inspect, test-fit, and evaluate your parts
							before committing to keep them. For unused products in original packaging with all
							documentation and accessories, we'll process your return with no questions asked.
						</p>
					</section>

					{/* FAQ accordion */}
					<section className="mb-12">
						<h2 className="text-2xl font-semibold text-primary-text mb-4">FAQ</h2>
						<div className="space-y-3">
							{faqs.map((f) => (
								<div key={f.id} className="bg-primary-bg rounded shadow overflow-hidden">
									<button
										onClick={() => toggle(f.id)}
										aria-expanded={openId === f.id}
										className="w-full text-left p-4 flex justify-between items-center"
									>
										<span className="font-medium text-primary-text">{f.q}</span>
										<span className="text-secondary-text">{openId === f.id ? '−' : '+'}</span>
									</button>
									{openId === f.id && (
										<div className="p-4 border-t border-secondary-text text-secondary-text">
											{f.a}
										</div>
									)}
								</div>
							))}
						</div>
					</section>
				</div>
			</main>
		</div>
	);
};

export default ContactUs;
