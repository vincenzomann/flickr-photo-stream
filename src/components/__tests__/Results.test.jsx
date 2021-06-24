import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Results from '../Results';

test('renders correctly', () => {
	render(<Results />);
	const results = screen.getByTestId('results');
	expect(results).toBeInTheDocument();
});
