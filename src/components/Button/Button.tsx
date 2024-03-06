import React from 'react';
import './Button.css';
interface ButtonProps {
	isDisabled: boolean;
	type: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
	message: string;
}

export const Button: React.FC<ButtonProps> = ({ isDisabled, type, message }: ButtonProps) => {
	return (
		<>
			<button className='button-main' disabled={isDisabled} type={type}>
				{message}
			</button>
		</>
	);
};

export default Button;
