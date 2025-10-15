import React from 'react';

const Home = () => {
	return (
		<div className="min-h-screen flex flex-col">
			<main className="flex-grow bg-gray-50 p-6">
				<h1 className="text-4xl font-bold text-center mb-6">Welcome to PitStopProvisions</h1>
				<p className="text-center text-lg">
					Your one-stop shop for premium racing gear and accessories.
				</p>
				<div className="mt-8 flex justify-center">
					<img src="/public/logo192.png" alt="PitStopProvisions" className="w-48 h-48" />
				</div>
			</main>
		</div>
	);
};

export default Home;
