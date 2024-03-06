import React from 'react';
import { RegisterOptions } from 'react-hook-form';
import './FormInput.css';

interface FormInputProps {
	register: any;
	error: string | undefined;
	name: string;
	validationOptions: RegisterOptions;
	type: React.HTMLInputTypeAttribute;
	placeholder: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({
	register,
	name,
	validationOptions,
	error,
	type,
	placeholder,
	value,
	onChange,
}) => {
	return (
		<>
			<input
				{...register(name, validationOptions)}
				type={type}
				name={name}
				placeholder={placeholder}
				value={value}
				className='main'
				onChange={onChange}
			/>
			{error && <div className='danger'>{error}</div>}
		</>
	);
};

export default FormInput;
