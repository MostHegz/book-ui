import { ApiConstants } from '../constants';
import { PaginatedResponse } from './interfaces/PaginatedResponse';

export interface GetBookResponse {
	id: string;
	title: string;
	authorName: string;
	publicationDate: Date;
}

export const getBooks = async (
	search: string,
	pageSize: number,
	pageNumber = 1,
): Promise<PaginatedResponse<GetBookResponse>> => {
	const response = await fetch(
		`${ApiConstants.BASE_URL}/${ApiConstants.BOOKS}?searchTerm=${search}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
	);
	if (!response.ok) {
		throw response;
	}
	return response.json() as Promise<PaginatedResponse<GetBookResponse>>;
};
