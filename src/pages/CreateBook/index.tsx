import React from 'react';
import { useForm } from 'react-hook-form';
import { createBook } from '../../api/createBook';
import { toast } from 'react-toastify';
import { Button, FormInput } from '../../components';
import './CreateBookForm.css';
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
		formState: { errors, isSubmitting, isValid },
	} = useForm<BookFormFields>();

	const onSubmit = async (data: BookFormFields) => {
		try {
			await createBook(data);
			reset();
			toast.success('Book created');
		} catch (error) {
			if (error instanceof Response && error.status === 409) {
				setError('title', {
					message: 'Title already exists',
				});
				return;
			}
			setError('root', { message: 'Something went wrong' });
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
					validationOptions={{ required: 'Title is required' }}
					type='text'
					placeholder='Title'
				/>

				<FormInput
					register={register}
					error={errors.authorName?.message}
					name={'authorName'}
					validationOptions={{ required: 'Author is required' }}
					type='text'
					placeholder='Author'
				/>

				<FormInput
					register={register}
					error={errors.publicationDate?.message}
					name={'publicationDate'}
					validationOptions={{ required: 'Publication Date is required' }}
					type='date'
					placeholder='Publication Date'
				/>

				<Button
					isDisabled={!isValid || isSubmitting}
					type='submit'
					message={isSubmitting ? 'Creating....' : 'Create Book'}
				/>
				{errors.root && <div>{errors.root.message}</div>}
			</form>
		</div>
	);
}

export default CreateBookForm;
