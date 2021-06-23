import React from 'react';
import './App.scss';
import Header from './components/Header';
import Results from './components/Results';
import FlickrProvider from './context/FlickrContext';

function App() {
	return (
		<div id='app'>
			<FlickrProvider>
				<Header />
				<Results />
			</FlickrProvider>
		</div>
	);
}

export default App;
