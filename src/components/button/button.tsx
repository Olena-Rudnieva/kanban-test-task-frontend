import { ReactNode } from 'react';

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = ({
  onClick,
  children,
  className = '',
  type = 'button',
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`border border-gray-400 rounded-md flex justify-center items-center hover:bg-slate-700 hover:text-white transition-all ${className}`}
    >
      {children}
    </button>
  );
};
