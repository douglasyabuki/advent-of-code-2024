import { useToggle } from "@/hooks/use-toggle";
import { Icons } from "@/icons/Icons";
import * as React from "react";
import { twMerge } from "tailwind-merge";

interface AccordionProps {
  className?: string;
  children: React.ReactNode;
  HeaderComponent?: React.ReactNode;
}

export default function Accordion({
  className,
  children,
  HeaderComponent = <></>,
}: AccordionProps) {
  const { isToggled, onToggle, onUntoggle } = useToggle();

  return (
    <li
      className={twMerge(
        "relative z-20 flex h-auto w-auto select-none flex-col items-start justify-between self-stretch border-[1px] border-slate-600 bg-slate-900 px-4 py-2 duration-150",
        isToggled ? "cursor-default" : "cursor-pointer hover:bg-slate-800",
        className,
      )}
      role="button"
      onClick={() => !isToggled && onToggle()}
    >
      <div className="flex h-12 w-auto flex-1 items-center justify-between gap-2 self-stretch">
        {HeaderComponent}
        <button
          onClick={isToggled ? onUntoggle : onToggle}
          className={twMerge("duration-150", isToggled ? "rotate-180" : "")}
        >
          <Icons.ANGLE_DOWN />
        </button>
      </div>
      <div
        className={twMerge(
          "z-10 flex h-auto w-full transform-gpu overflow-hidden duration-150",
          isToggled ? "relative max-h-max" : "absolute max-h-0",
        )}
      >
        <span
          className={twMerge(
            "z-10 mt-2 flex w-auto flex-1 transform-gpu flex-col gap-4 self-stretch py-2 duration-150",
            isToggled ? "relative" : "absolute -translate-y-5",
          )}
        >
          {children}
        </span>
      </div>
    </li>
  );
}
