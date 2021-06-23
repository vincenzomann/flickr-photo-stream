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

	const loadMorePhotos = () => {
		setLoading(true);
		fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${process.env.REACT_APP_FLICKR_API_KEY}&extras=date_upload%2C+description%2C+owner_name%2C+tags&per_page=10&page=${page}&format=json&nojsoncallback=1`).then((res) => {
			return res.json();
		}).then((data) => {
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
			setPage((page) => page + 1);
		}).catch((error) => {
			console.log(error);
		});
	};

	// Fetch the recent photos from Flickr API on first render
	useEffect(() => {
		loadMorePhotos();
	}, []);

	const [loading, setLoading] = useState(true);
	const [initialLoad, setInitialLoad] = useState(true);
	const resultsRef = useRef<HTMLDivElement>(null);

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
		<div id='results' ref={resultsRef} className='row justify-content-around'>
			{/* {recentPhotos && console.log(recentPhotos)} */}
			{page && <div id='pageHeader'>Recent Photos - page: {page}</div>}
			{recentPhotos.map((photo) => (
				<PhotoCard photo={photo} key={photo.id} />
			))
			}
		</div>
	);
};

export default Results;
