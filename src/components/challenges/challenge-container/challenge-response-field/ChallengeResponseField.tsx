import { useClipboard } from "@/hooks/use-clipboard";
import { useToggle } from "@/hooks/use-toggle";
import { Icons } from "@/icons/Icons";
import { Button } from "@/ui/button/Button";
import { useEffect, useRef } from "react";

interface ChallengeResponseFieldProps {
  part: string;
  response: unknown;
}

export const ChallengeResponseField = ({
  part,
  response,
}: ChallengeResponseFieldProps) => {
  const success = useToggle();
  const { copyData } = useClipboard();
  const timeoutRef = useRef<NodeJS.Timeout | number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <Button
      onClick={() =>
        copyData({
          data: response,
          onSuccess: () => {
            success.onToggle();
            timeoutRef.current = setTimeout(() => success.onUntoggle(), 1000);
          },
          onError: () => {},
        })
      }
      variant="tertiary"
      disabled={!response}
    >
      <strong className="font-bold">Part {part}:</strong>
      <p>
        {!!response &&
          (typeof response === "string" ? response : JSON.stringify(response))}
      </p>
      {success.isToggled ? (
        <Icons.CHECK_OUTLINED />
      ) : (
        <Icons.COPY className="text-current" />
      )}
    </Button>
    // <button
    //   className="flex h-10 w-fit min-w-48 items-center justify-between gap-2 border-[2px] border-slate-400 px-4 py-2 text-sm duration-150 enabled:hover:border-sky-400 disabled:border-gray-600 disabled:text-gray-600 active:bg-slate-600"
    //   disabled={!response}
    //   onClick={() =>
    //     copyData({
    //       data: response,
    //       onSuccess: () => {},
    //       onError: () => {},
    //     })
    //   }
    // >
    //   <strong className="font-bold">Part {part}:</strong>
    //   <p>
    //     {!!response &&
    //       (typeof response === "string" ? response : JSON.stringify(response))}
    //   </p>
    //   <Icons.COPY className="text-current" />
    // </button>
  );
};
