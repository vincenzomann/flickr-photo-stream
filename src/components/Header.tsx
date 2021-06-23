import React from 'react';
import SearchBar from './SearchBar';

interface Props {

}

const Header: React.FC<Props> = () => {
	return (
		<div id='header' className='row'>
			<h1>Flickr Photo Stream</h1>
			<SearchBar />
		</div>
	);
};

export default Header;
