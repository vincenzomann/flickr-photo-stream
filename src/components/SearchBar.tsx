import React, { useState } from 'react';
import { useFlickr } from '../context/FlickrContext';

interface Props { }

const SearchBar: React.FC<Props> = () => {

	const { setSearchTerm } = useFlickr();

	const [input, setInput] = useState('');

	return (
		<div id='searchBorder'>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					setSearchTerm(input);
				}}
				style={{ justifyContent: 'center' }}>
				<div className="row formRow">
					<button className='col searchBtn' type='submit'>
						<i className='bi bi-search' />
					</button>
					<input className='col-8' id='searchInput' type='text' placeholder='search'
						value={input} onChange={(e) => {
							e.preventDefault();
							setInput(e.target.value);
						}} />
					<button className='col searchBtn' type='button' value='clear'
						onClick={() => {
							setInput('');
							setSearchTerm('');
						}}>
						<i className='bi bi-x' />
					</button>
				</div>
			</form>
		</div>
	);
};

export default SearchBar;
