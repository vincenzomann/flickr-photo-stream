import { render, fireEvent } from '@testing-library/react';
import Header from '../Header';

test('renders correctly', () => {
	const { queryByTestId } = render(<Header />);
	const component = queryByTestId('header');
	expect(component).toBeTruthy();
});
