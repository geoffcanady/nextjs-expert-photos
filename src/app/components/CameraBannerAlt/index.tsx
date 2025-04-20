import React, { useEffect, useRef, useState } from "react";
import { Transition } from "react-transition-group";
import { useCameraContext } from "@/app/lib/context/camera-context";
import { useGlobalContext } from "@/app/lib/context/global-context";
import useGestureFeedback from "@/app/lib/hooks/useGestureFeedback";
import { StyledBannerContainer, StyledCameraBanner } from "./index.styles";
import { Number } from "./Number";

interface CameraBannerProps {
  disabled: boolean;
  showCountdown?: boolean;
}

export default function CameraBannerAlt({
  disabled,
  showCountdown = false,
}: CameraBannerProps) {
  const { fadeTiming, feedbackOption, fontSize } = useGlobalContext();
  const { count, detectionResults } = useCameraContext();
  const { gestureFeedbackMsg } = useGestureFeedback(detectionResults);
  const [showFeedback, setShowFeedback] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    if (gestureFeedbackMsg === "" && !showCountdown) {
      setShowFeedback(false);
    } else {
      setShowFeedback(true);
    }
  }, [gestureFeedbackMsg, showCountdown]);

  return (
    <Transition
      in={showFeedback}
      timeout={100}
      mountOnEnter
      unmountOnExit
      nodeRef={nodeRef}
    >
      {(state) => (
        <StyledBannerContainer
          fontSize={fontSize}
          $feedbackOption={feedbackOption}
          $state={state}
          $showCountdown={showCountdown}
          ref={nodeRef}
        >
          <StyledCameraBanner
            fontSize={fontSize}
            $feedbackOption={feedbackOption}
            $disabled={disabled}
            $showCountdown={showCountdown}
          >
            {!showCountdown && gestureFeedbackMsg}
            {showCountdown && count !== 0 && <Number value={count} />}
          </StyledCameraBanner>
        </StyledBannerContainer>
      )}
    </Transition>
  );
}
