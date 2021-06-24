import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders "Flickr Photo Stream"', () => {
	render(<App />);
	const title = screen.getByText(/Flickr Photo Stream/i);
	expect(title).toBeInTheDocument();
});
test('renders provider', () => {
	const { queryByTestId } = render(<App />);
	const provider = queryByTestId('provider');
	console.log(provider);
	// expect(provider).toBeTruthy();
});
