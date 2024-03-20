import React from "react";

interface InputProps {
  value?: string;
  disabled?: boolean;
  type?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Input: React.FC<InputProps> = ({
  value,
  disabled,
  type,
  placeholder,
  onChange,
}) => {
  return (
    <input
      type={type}
      disabled={disabled}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      className="
      w-full
      p-4 
      text-lg 
      bg-black 
      border-2
      border-neutral-800 
      rounded-md
      outline-none
      text-white
      focus:border-yellow-500
      focus:border-2
      transition
      disabled:bg-neutral-900
      disabled:opacity-70
      disabled:cursor-not-allowed
    "
    />
  );
};

export default Input;
