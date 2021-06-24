export interface RecentPhoto {
	dateupload: string;
	datetaken: string;
	description: { _content: string; };
	datetakengranularity: number;
	datetakenunknown: string;
	farm: number;
	id: string;
	isfamily: number;
	isfriend: number;
	ispublic: number;
	owner: string;
	ownername: string;
	secret: string;
	server: string;
	title: string;
	tags: string;
}
