import React, { createContext, useContext, useState } from 'react';
import { RecentPhoto } from './../types';

interface ContextType {
	recentPhotos: RecentPhoto[];
	setRecentPhotos: React.Dispatch<React.SetStateAction<RecentPhoto[]>>;
	page: number;
	setPage: React.Dispatch<React.SetStateAction<number>>;
	error: string;
	setError: React.Dispatch<React.SetStateAction<string>>;
	searchTerm: string;
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const initValues = {
	recentPhotos: [],
	setRecentPhotos: () => { },
	page: 0,
	setPage: () => { },
	error: '',
	setError: () => { },
	searchTerm: '',
	setSearchTerm: () => { }
};

const FlickrContext = createContext<ContextType>(initValues);

export function useFlickr() {
	return useContext(FlickrContext);
}

const FlickrProvider: React.FC = ({ children }) => {
	const [page, setPage] = useState(0);
	const [error, setError] = useState('');
	const [recentPhotos, setRecentPhotos] = useState<RecentPhoto[]>([]);
	const [searchTerm, setSearchTerm] = useState('');

	const values = {
		recentPhotos,
		setRecentPhotos,
		page,
		setPage,
		error,
		setError,
		searchTerm,
		setSearchTerm
	};

	return (
		<FlickrContext.Provider value={values} data-testid='provider'>
			{children}
		</FlickrContext.Provider>
	);
};

export default FlickrProvider;
