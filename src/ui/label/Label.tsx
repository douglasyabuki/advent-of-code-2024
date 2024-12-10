import { twMerge } from "tailwind-merge";

interface Label extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  htmlFor?: string;
  children: React.ReactNode;
}

export const Label = ({ className = "", children, htmlFor = "" }: Label) => {
  return (
    <label
      className={twMerge("text-sm tracking-tight", className)}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
};
