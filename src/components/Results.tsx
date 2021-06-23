import React, { useEffect } from 'react';
import { useFlickr } from './../context/FlickrContext';
import PhotoCard from './PhotoCard';

interface Props {

}

const Results: React.FC<Props> = () => {

	const { setRecentPhotos, recentPhotos, setPage, page } = useFlickr();

	// Fetch the recent photos from Flickr API on first render
	useEffect(() => {
		fetch('https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=3b8fef2afb98d72862967347c1acfad0&extras=date_upload%2C+description%2C+owner_name%2C+tags&per_page=10&page=1&format=json&nojsoncallback=1').then((res) => {
			return res.json();
		}).then((data) => {
			console.log(data.photos);
			setPage(data.photos.page);
			setRecentPhotos(data.photos.photo);
		}).catch((error) => {
			console.log(error);
		});
	}, []);

	return (
		<div id='results' className='row justify-content-around'>
			{page && <div id='pageHeader'>Recent Photos - page: {page}</div>}
			{recentPhotos ?
				recentPhotos.map((photo) => (
					<PhotoCard photo={photo} />
				)) :
				<div>Loading...</div>
			}
		</div>
	);
};

export default Results;
