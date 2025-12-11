import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="mb-4">
      <label className="block font-subhead font-bold text-ink mb-1 text-lg">
        {label}
      </label>
      <input 
        className={`w-full bg-paper border-b-2 border-ink p-2 font-body focus:outline-none focus:border-news-red transition-colors placeholder-gray-400 ${className}`}
        {...props}
      />
    </div>
  );
};