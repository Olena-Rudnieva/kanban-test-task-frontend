interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export const Input = ({
  value,
  onChange,
  placeholder,
  className,
}: InputProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder || 'Enter text'}
      className={`border border-gray-600 p-[10px] shadow-sm rounded-md ${className}`}
    />
  );
};
