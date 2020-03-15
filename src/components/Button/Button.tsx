import React from 'react';
/**Styles */
import './button.scss';

type ButtonProps = {
    children?: React.ReactNode;
    className?: string;
    props?: any;
    onClick?: any;
};

const Button = ({ children, onClick, className, ...props }: ButtonProps) => {
    return (
        <button className={`${className} button`} onClick={onClick} {...props}>
            {children}
        </button>
    );
};

export default Button;
