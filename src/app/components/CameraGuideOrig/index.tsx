import { useEffect, useState } from "react";
import { GestureFeedbackMessages } from "@/app/lib/types/enums";
import CameraGuideBottomLeft from "./CameraGuideBottomLeft";
import CameraGuideBottomRight from "./CameraGuideBottomRight";
import CameraGuideTopLeft from "./CameraGuideTopLeft";
import CameraGuideTopRight from "./CameraGuideTopRight";
import { StyledGuideContainer, StyledGuideInner } from "./index.styles";

export default function CameraGuide({
  gestureFeedbackMsg,
}: {
  gestureFeedbackMsg: string;
}) {
  const [feedbackColor, setFeedbackColor] = useState<string>("");

  useEffect(() => {
    if (gestureFeedbackMsg === GestureFeedbackMessages.None) {
      setFeedbackColor("#2CA01C");
    } else {
      setFeedbackColor("#CB3534");
    }
  }, [gestureFeedbackMsg]);

  return (
    <StyledGuideContainer>
      <StyledGuideInner>
        <CameraGuideTopLeft feedbackColor={feedbackColor} />
        <CameraGuideTopRight feedbackColor={feedbackColor} />
        <CameraGuideBottomRight feedbackColor={feedbackColor} />
        <CameraGuideBottomLeft feedbackColor={feedbackColor} />
      </StyledGuideInner>
    </StyledGuideContainer>
  );
}
