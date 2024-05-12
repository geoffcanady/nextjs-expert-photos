import { useState, useEffect } from 'react';

interface ToggleVisibilityState {
  showDetectionOutput: boolean;
  showObjects: boolean;
  showGestureMsg: boolean;
}

export const useToggleVisibility = (): ToggleVisibilityState => {
  const [showDetectionOutput, setShowDetectionOutput] =
    useState<boolean>(false);
  const [showObjects, setShowObjects] = useState<boolean>(false);
  const [showGestureMsg, setShowGestureMsg] = useState<boolean>(false);

  useEffect(() => {
    const toggleVisibility = (event: KeyboardEvent): void => {
      switch (event.key) {
        case 'u':
          if (event.metaKey) {
            event.preventDefault();
            setShowDetectionOutput(!showDetectionOutput);
          }
          break;
        case 'k':
          if (event.metaKey) {
            event.preventDefault();
            setShowObjects(!showObjects);
          }
          break;
        case 'i':
          if (event.metaKey) {
            event.preventDefault();
            setShowGestureMsg(!showGestureMsg);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', toggleVisibility);

    return () => {
      window.removeEventListener('keydown', toggleVisibility);
    };
  }, [showDetectionOutput, showGestureMsg, showObjects]);

  return {
    showDetectionOutput,
    showObjects,
    showGestureMsg,
  };
};
