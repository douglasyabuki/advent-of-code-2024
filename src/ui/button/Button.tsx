import React from "react";
import { twMerge } from "tailwind-merge";

type Variant = "primary" | "secondary" | "tertiary";

type Size = "small" | "medium" | "large";

const variantStyles = {
  primary: "bg-slate-900 text-white enabled:hover:bg-slate-800",
  secondary:
    "bg-none text-white border-[2px] enabled:hover:border-sky-600 border-sky-400",
  tertiary: "bg-slate-800 enabled:hover:bg-slate-700 text-white",
};

const sizeStyles = {
  small: "rounded-base h-8 w-[6.25rem] gap-2 px-4 py-[0.375rem] text-xs",
  medium: "rounded-base h-10 w-[8.75rem] gap-2 px-4 py-2 text-sm",
  large: "rounded-base h-12 w-40 gap-2 px-4 py-3 text-base",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
}

export const Button = ({
  children,
  className = "",
  variant = "primary",
  size = "medium",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={twMerge(
        sizeStyles[size],
        variantStyles[variant],
        "box-border flex min-w-fit shrink-0 items-center justify-between",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
