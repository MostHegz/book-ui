import React from 'react';
import { GetBookResponse, getBooks } from '../../../api/getBooks';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import './AutoCompleteBooks.css';
interface AutoCompleteProps {
	searchTerm: string;
}

const AutoCompleteBooks: React.FC<AutoCompleteProps> = ({ searchTerm }) => {
	const debouncedSearchTerm = useDebounce(searchTerm, 500);
	const { data: books, isLoading } = useQuery({
		queryKey: ['books', { debouncedTitleValue: debouncedSearchTerm }],
		queryFn: () => getBooks(debouncedSearchTerm, 3),
		enabled: debouncedSearchTerm.length > 0,
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			{isLoading && <div>Loading...</div>}
			{!!books?.data.length && (
				<>
					<h4>Similar Books: </h4>
					<ul>
						{books?.data.map((item: GetBookResponse) => (
							<li key={item.id}>
								{item.title} by {item.authorName}
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
};

export default AutoCompleteBooks;
