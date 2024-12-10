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
  );
};
