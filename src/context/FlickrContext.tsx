import React, { createContext, useContext, useState } from 'react';
import { RecentPhoto } from './../types';

interface ContextType {
	recentPhotos: RecentPhoto[];
	setRecentPhotos: React.Dispatch<React.SetStateAction<RecentPhoto[]>>;
	page: number;
	setPage: React.Dispatch<React.SetStateAction<number>>;
}

const initValues = {
	recentPhotos: [],
	setRecentPhotos: () => { },
	page: 0,
	setPage: () => { }
};

const FlickrContext = createContext<ContextType>(initValues);
// const FlickrContext = createContext<any>({});

export function useFlickr() {
	return useContext(FlickrContext);
}

const FlickrProvider: React.FC = ({ children }) => {
	const [page, setPage] = useState(1);
	const [recentPhotos, setRecentPhotos] = useState<RecentPhoto[]>([]);

	const values = {
		recentPhotos,
		setRecentPhotos,
		page,
		setPage
	};

	return (
		<FlickrContext.Provider value={values} >
			{children}
		</FlickrContext.Provider>
	);
};

export default FlickrProvider;
