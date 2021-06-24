import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../SearchBar';
import { debug } from 'console';

test('renders correctly', () => {
	render(<SearchBar />);
	const searchBar = screen.getByTestId('searchBar');
	const searchBtn = screen.getByTestId('searchBtn');
	const input = screen.getByPlaceholderText('search');
	expect(searchBar).toBeInTheDocument();
	expect(searchBtn).toBeInTheDocument();
	expect(input).toBeInTheDocument();
});

describe('Input value', () => {
	it('updates on change', () => {
		render(<SearchBar />);
		const input = screen.getByPlaceholderText('search');
		fireEvent.change(input, { target: { value: 'test' } });
		expect(input).toHaveValue('test');
	});
});
