import React, { useEffect, useRef, useState } from "react";
import { Transition } from "react-transition-group";
import { useCameraContext } from "@/app/lib/context/camera-context";
import useGestureFeedback from "@/app/lib/hooks/useGestureFeedback";
import { StyledBannerContainer, StyledCameraBanner } from "./index.styles";
import IconSmileEmoji from "../Icons/IconSmileEmoji";

// For testing
import { useGlobalContext } from "@/app/lib/context/global-context";

export default function CameraBanner({ disabled }: { disabled: boolean }) {
  const { detectionResults, showCountdown } = useCameraContext();
  const { gestureFeedbackMsg } = useGestureFeedback(detectionResults);
  const [showFeedback, setShowFeedback] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    if (gestureFeedbackMsg !== "" || showCountdown) {
      setShowFeedback(true);
    } else {
      setShowFeedback(false);
    }
  }, [gestureFeedbackMsg, showCountdown]);

  return (
    <Transition
      in={showFeedback}
      timeout={200}
      mountOnEnter
      unmountOnExit
      nodeRef={nodeRef}
    >
      {(state) => (
        <StyledBannerContainer $state={state} ref={nodeRef}>
          {showCountdown && (
            <StyledCameraBanner>
              Look here <IconSmileEmoji /> and smile!
            </StyledCameraBanner>
          )}
          {showFeedback && !showCountdown && (
            <StyledCameraBanner $disabled={disabled}>
              {gestureFeedbackMsg}
            </StyledCameraBanner>
          )}
        </StyledBannerContainer>
      )}
    </Transition>
  );
}
