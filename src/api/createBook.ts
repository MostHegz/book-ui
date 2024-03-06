import { ApiConstants } from '../constants';

export interface CreateBookRequest {
	title: string;
	authorName: string;
	publicationDate: Date;
}

export interface CreateBookResponse {
	id: string;
	title: string;
	authorName: string;
	publicationDate: Date;
}

export const createBook = async (book: CreateBookRequest): Promise<CreateBookResponse> => {
	const response = await fetch(`${ApiConstants.BASE_URL}/${ApiConstants.BOOKS}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(book),
	});
	if (!response.ok) {
		throw response;
	}
	return response.json() as Promise<CreateBookResponse>;
};
