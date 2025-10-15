/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	theme: {
		extend: {
			colors: {
				'primary-bg': 'var(--primary-bg)',
				'primary-bg-hover': 'var(--primary-bg-hover)',
				'primary-text': 'var(--primary-text)',
				'secondary-bg': 'var(--secondary-bg)',
				'secondary-text': 'var(--secondary-text)',
				'border-color': 'var(--border-color)',
				'placeholder-color': 'var(--placeholder-color)',
				'focus-ring': 'var(--focus-ring)',
			},
		},
	},
	plugins: [],
};
