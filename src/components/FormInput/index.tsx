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
}

const FormInput: React.FC<FormInputProps> = ({
	register,
	name,
	validationOptions,
	error,
	type,
	placeholder,
	value,
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
			/>
			{error && <div className='danger'>{error}</div>}
		</>
	);
};

export default FormInput;
