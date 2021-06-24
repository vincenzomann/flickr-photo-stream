import React from 'react';
import { RecentPhoto } from '../types';

interface Props {
	photo: RecentPhoto;
}

const Photo: React.FC<Props> = ({ photo }) => {
	return (
		<div className='card' data-testid={`photoCard-${photo.id}`}>
			<a className='cardLink' target='__blank'
				href={`https://www.flickr.com/photos/${photo.owner}/${photo.id}`}>
				<img id='cardImg' alt="photo"
					src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} />
			</a>
			<div className="card-body">
				<p className="card-title">
					<a className='photoTitle' target='__blank' data-testid='photoTitle'
						href={`https://www.flickr.com/photos/${photo.owner}/${photo.id}`}>
						{photo.title}
					</a>
					{` by `}
					<a target='__blank' href={`https://www.flickr.com/people/${photo.owner}`}>
						{photo.ownername}
					</a>
				</p>
				<div className="card-text">
					<p>Uploaded: {new Date(parseInt(photo.dateupload) * 1000).toUTCString()}</p>
					<p>Taken: {photo.datetaken}</p>
				</div>
				<div className="card-text">Description: <p>{photo.description._content}</p></div>
				<div className="card-text">Tags: <p>{photo.tags.replace(/ /g, ', ')}</p></div>
			</div>
		</div>
	);
};

export default Photo;
