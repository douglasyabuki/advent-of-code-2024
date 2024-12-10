import { useCallback } from "react";

type CopyDataParams = {
  data: unknown;
  onSuccess: () => void;
  onError: (err: unknown) => void;
};

export const useClipboard = () => {
  const copyData = useCallback(
    ({ data, onSuccess, onError }: CopyDataParams) => {
      const jsonString = JSON.stringify(data, null, 2);
      navigator.clipboard
        .writeText(jsonString)
        .then(() => {
          onSuccess();
        })
        .catch((err) => onError(err));
    },
    [],
  );

  return { copyData };
};
