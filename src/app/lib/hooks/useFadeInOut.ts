import { useState, useCallback } from "react";

export default function useFadeInOut(
  duration: number,
  onTimeout?: () => void
): { showFade: boolean; triggerFade: () => void } {
  const [showFade, setShowFade] = useState(false);

  const triggerFade = useCallback(() => {
    setShowFade(true);

    const timer = setTimeout(() => {
      setShowFade(false);
      if (onTimeout) {
        onTimeout();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  return { showFade, triggerFade };
}
