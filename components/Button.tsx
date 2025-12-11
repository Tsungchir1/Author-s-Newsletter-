import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "font-headline font-bold uppercase tracking-wider py-2 px-6 transition-all duration-200 border-2 border-ink";
  
  const variants = {
    primary: "bg-ink text-paper hover:bg-news-red hover:border-news-red",
    secondary: "bg-news-red text-paper border-news-red hover:bg-ink hover:border-ink",
    outline: "bg-transparent text-ink hover:bg-ink hover:text-paper"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};