import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-lg cursor-pointer font-sans';
  
  const variants = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 hover:shadow-lg disabled:bg-primary-300',
    secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 hover:shadow-lg disabled:bg-secondary-300',
    outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white disabled:border-primary-300 disabled:text-primary-300',
    ghost: 'text-primary-500 hover:bg-primary-50 disabled:text-primary-300',
    dark: 'bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-700',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;