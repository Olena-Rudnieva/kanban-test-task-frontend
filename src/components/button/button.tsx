import { ReactNode } from 'react';

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const Button = ({
  onClick,
  children,
  className = '',
  type = 'button',
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-gradient-to-b from-gray-200 to-gray-300 text-gray-800 border border-gray-400 font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-md hover:from-gray-100 hover:to-gray-200 transition-all ${className} ${
        disabled ? 'opacity-70 cursor-not-allowed' : ''
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
