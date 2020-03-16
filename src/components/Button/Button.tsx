import React from 'react';
/**Styles */
import './button.scss';

type ButtonProps = {
    children?: React.ReactNode;
    className?: string;
    disabled?: boolean;
    onClick: any;
};

const Button = ({ children, className, disabled = false, onClick }: ButtonProps) => {
    return (
        <button className={`${className ? className : ''} button`} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
