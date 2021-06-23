import React, { useEffect, useRef, useState } from 'react';
import { RecentPhoto } from '../types';
import { useFlickr } from './../context/FlickrContext';
import PhotoCard from './PhotoCard';

interface Props {

}

function isBottom(ref: React.RefObject<HTMLDivElement>) {
	if (!ref.current) {
		return false;
	}
	return ref.current.getBoundingClientRect().bottom <= window.innerHeight;
}

const Results: React.FC<Props> = () => {

	const { setRecentPhotos, recentPhotos, setPage, page } = useFlickr();

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	const loadMorePhotos = () => {
		setPage((page) => page + 1);
		setLoading(true);
		// flickr.photos.search
		// Extras: date_upload, description, owner_name, tags
		// Params: safe_search=1, per_page=10, max_upload_date=1624476931
		const unixDate = Math.round((new Date()).getTime() / 1000);
		fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.REACT_APP_FLICKR_API_KEY}&max_upload_date=${unixDate}&safe_search=1&extras=date_upload%2C+description%2C+owner_name%2C+tags&per_page=10&page=${page}&format=json&nojsoncallback=1`).then((res) => {
			return res.json();
		}).then((data) => {
			console.log(data);
			const nextFetch: RecentPhoto[] = data.photos.photo;
			// Filter out duplicates because the flickr api pagination is broken!
			setRecentPhotos((prevPhotos) => {
				// Set all photos if it is the first fetch
				if (!prevPhotos.length) {
					return data.photos.photo;
				}
				// Find if any of the nextFetch id exist in the prevPhotos
				let nonDuplicates = nextFetch.filter((photo: RecentPhoto) => {
					const duplicateFound = prevPhotos.some((el) => {
						return el.id === photo.id;
					});
					// If a duplicate is found don't keep it
					return duplicateFound ? false : true;
				});
				return [...prevPhotos, ...nonDuplicates];
			});
			setLoading(false);
		}).catch((error) => {
			setError('Invalid API Key, please go to https://www.flickr.com/services/api/keys and insert your API key in the .env file');
		});
	};

	// Fetch the recent photos from Flickr API on first render
	useEffect(() => {
		loadMorePhotos();
	}, []);

	// Event listener to fetch more entries when scrolling to top is detected
	const container = document.getElementById('root');
	useEffect(() => {
		const handleLoadMore = () => {
			// console.log(container?.scrollTop, container?.offsetHeight, container?.scrollHeight);
			if (container) {
				let triggerHeight = container?.scrollTop + container?.offsetHeight;
				if (triggerHeight + 1 >= container.scrollHeight) {
					!loading && loadMorePhotos();
				}
			}
		};
		if (container) {
			container?.addEventListener('scroll', handleLoadMore);
			return () => container?.removeEventListener('scroll', handleLoadMore);
		}
	}, [loadMorePhotos, loading]);

	return (
		<div id='results' className='row justify-content-around'>
			{page && <div id='pageHeader'>Recent Photos - page: {page}</div>}
			{error && <div id='pageHeader'>Error: {error}</div>}
			{recentPhotos.map((photo) => (
				<PhotoCard photo={photo} key={photo.id} />
			))}
		</div>
	);
};

export default Results;
