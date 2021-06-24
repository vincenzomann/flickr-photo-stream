import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PhotoCard from '../PhotoCard';

const mockPhoto = {
	dateupload: '',
	datetaken: '',
	description: { _content: '' },
	datetakengranularity: 0,
	datetakenunknown: '',
	farm: 0,
	id: '1',
	isfamily: 0,
	isfriend: 0,
	ispublic: 0,
	owner: '',
	ownername: '',
	secret: '',
	server: '',
	title: 'Test Title',
	tags: ''
};

it('renders', () => {
	render(<PhotoCard photo={mockPhoto} />);
	const photoCard = screen.getByTestId('photoCard-1');
	expect(photoCard).toBeInTheDocument();
});
