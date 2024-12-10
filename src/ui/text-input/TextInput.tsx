import React, { useId } from "react";
import { twMerge } from "tailwind-merge";
import { Label } from "../label/Label";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  placeholder?: string;
  id?: string;
  props?: React.InputHTMLAttributes<HTMLInputElement>;
  value: string;
  children?: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput = ({
  className,
  id,
  label,
  placeholder,
  value,
  onChange,
  children,
  ...props
}: TextInputProps) => {
  const autoId = useId();
  const textId = id ? id : autoId;

  return (
    <div
      className={twMerge(
        "rounded-base group relative flex h-10 w-auto items-center justify-start border-[2px] border-slate-400 px-4 transition-all duration-150 has-[:focus]:border-sky-400 has-[:selected]:border-sky-400 has-[:disabled]:opacity-75 has-[:enabled]:hover:border-sky-400",
        className,
      )}
    >
      <input
        type="text"
        id={textId}
        className="peer h-full w-full flex-grow appearance-none bg-transparent text-sm outline-none"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        {...props}
      />
      <Label
        htmlFor={textId}
        className={twMerge(
          "absolute left-2 flex h-1/2 max-h-fit items-center px-1 font-bold transition-transform duration-150",
          value
            ? "mb-5 -translate-x-2 -translate-y-full"
            : "peer-focus:mb-5 peer-focus:-translate-x-2 peer-focus:-translate-y-full",
          placeholder && "mb-5 -translate-x-2 -translate-y-full",
        )}
      >
        {label}
      </Label>
      {children}
    </div>
  );
};
