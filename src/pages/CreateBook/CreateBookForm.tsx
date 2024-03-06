import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createBook } from '../../api/createBook';
import { toast } from 'react-toastify';
import { Button, FormInput } from '../../components';
import './CreateBookForm.css';
import AutoCompleteBooks from './AutoCompleteBooks/AutoCompleteBooks';
import { ErrorMessages, Messages } from '../../constants';

interface BookFormFields {
	title: string;
	authorName: string;
	publicationDate: Date;
}

function CreateBookForm() {
	const {
		register,
		handleSubmit,
		setError,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<BookFormFields>();

	const [titleValue, setTitleValue] = useState('');

	const onSubmit = async (data: BookFormFields) => {
		try {
			await createBook(data);
			reset();
			toast.success(Messages.BOOK_CREATED);
		} catch (error) {
			if (error instanceof Response && error.status === 409) {
				setError('title', {
					message: ErrorMessages.TITLE_ALREADY_EXISTS,
				});
				return;
			}
			setError('root', { message: ErrorMessages.SOMETHING_WENT_WRONG });
		}
	};

	return (
		<div>
			<form className='form-style' onSubmit={handleSubmit(onSubmit)}>
				<h1>Add new book</h1>
				<FormInput
					register={register}
					error={errors.title?.message}
					name={'title'}
					validationOptions={{ required: ErrorMessages.TITLE_IS_REQUIRED }}
					type='text'
					placeholder='Title'
					value={titleValue}
					onChange={(e) => setTitleValue(e.target.value)}
				/>

				{titleValue && <AutoCompleteBooks searchTerm={titleValue} />}

				<FormInput
					register={register}
					error={errors.authorName?.message}
					name={'authorName'}
					validationOptions={{ required: ErrorMessages.AUTHOR_IS_REQUIRED }}
					type='text'
					placeholder='Author'
				/>

				<FormInput
					register={register}
					error={errors.publicationDate?.message}
					name={'publicationDate'}
					validationOptions={{ required: ErrorMessages.PUBLICATION_DATE_IS_REQUIRED }}
					type='date'
					placeholder='Publication Date'
				/>

				<Button
					isDisabled={isSubmitting}
					type='submit'
					message={isSubmitting ? 'Creating....' : 'Create Book'}
				/>
				{errors.root && <div>{errors.root.message}</div>}
			</form>
		</div>
	);
}

export default CreateBookForm;
