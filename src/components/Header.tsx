import React from 'react';
import { useFlickr } from '../context/FlickrContext';
import SearchBar from './SearchBar';

interface Props { }

const Header: React.FC<Props> = () => {

	const { page, error, searchTerm } = useFlickr();

	return (
		<div id='header' className='row' data-testid='header'>
			{!error ? (
				<>
					<div className="col pageCount">{searchTerm ? 'Search Results' : 'Recent Photos'}: page {page}</div>
					<div className="col-sm-6">
						<SearchBar />
					</div>
				</>
			) : (
				<div>Error: {error}</div>
			)}
		</div>
	);
};

export default Header;
