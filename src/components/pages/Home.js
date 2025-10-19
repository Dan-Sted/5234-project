import React from 'react';

const Home = () => {
	return (
		<div className="min-h-screen flex flex-col">
			<main className="flex-grow bg-secondary-bg p-6 text-primary-text">
				<h1 className="text-4xl font-bold text-center mb-6">Welcome to PitStopProvisions</h1>
				<p className="text-center text-lg">
					Your one-stop shop for premium racing gear and accessories.
				</p>
				<div className="mt-8 flex justify-center">
					<img src={require('../images/logo.png')} alt="PitStopProvisions" className="w-100 h-90" />
				</div>
			</main>
		</div>
	);
};

export default Home;
