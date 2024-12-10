import { useCallback, useState } from "react";

export const useToggle = () => {
  const [isToggled, setIsToggled] = useState(false);

  const onToggle = useCallback(() => {
    return setIsToggled(true);
  }, []);

  const onUntoggle = useCallback(() => {
    return setIsToggled(false);
  }, []);

  return { isToggled, onToggle, onUntoggle };
};
