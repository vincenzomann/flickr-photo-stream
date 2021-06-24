import React from 'react';
import './App.scss';
import Header from './components/Header';
import Results from './components/Results';
import FlickrProvider from './context/FlickrContext';

function App() {
	return (
		<div id='app'>
			<FlickrProvider>
				<div className='row'>
					<h1>Flickr Photo Stream</h1>
				</div>
				<Header />
				<Results />
			</FlickrProvider>
		</div>
	);
}

export default App;
