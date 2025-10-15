import React from 'react';

const AboutUs = () => {
	return (
		<div className="min-h-screen flex flex-col">
			<main className="flex-grow bg-gray-50 p-6">
				<h1 className="text-3xl font-bold mb-6">About Us</h1>
				<section className="mb-8">
					<h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
					<p>
						To provide the highest quality racing gear and accessories to enthusiasts worldwide.
					</p>
				</section>
				<section className="mb-8">
					<h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
					<p>To be the leading provider of innovative and premium racing products.</p>
				</section>
				<section className="mb-8">
					<h2 className="text-2xl font-semibold mb-4">Meet Our Executives</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						<div className="bg-white rounded-lg shadow p-4 text-center">
							<img
								src="/public/logo192.png"
								alt="Executive"
								className="w-24 h-24 mx-auto rounded-full mb-4"
							/>
							<h3 className="text-xl font-semibold">John Doe</h3>
							<p className="text-gray-500">CEO</p>
							<p className="text-sm">Harvard MBA, 20 years in racing industry.</p>
						</div>
						{/* Add more executives here */}
					</div>
				</section>
			</main>
		</div>
	);
};

export default AboutUs;
