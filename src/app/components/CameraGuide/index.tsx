import { useEffect, useState } from "react";
import { useCameraContext } from "@/app/lib/context/camera-context";
import useGestureFeedback from "@/app/lib/hooks/useGestureFeedback";
import { GestureFeedbackMessages } from "@/app/lib/types/enums";
import StaticImg from "@/app/components/StaticImg";
import { FACE_GRID_DEFAULT } from "@/app/lib/base64/face-grid-default";
import { FACE_GRID_SUCCESS } from "@/app/lib/base64/face-grid-success";
import { CameraGuideContainer } from "./index.styles";
import FadeInOut from "../FadeInOut";
import { useGlobalContext } from "@/app/lib/context/global-context";

export default function CameraGuide() {
  const [imgUrl, setImgUrl] = useState("");
  const { detectionResults } = useCameraContext();
  const { gestureFeedbackMsg } = useGestureFeedback(detectionResults);

  useEffect(() => {
    if (gestureFeedbackMsg === GestureFeedbackMessages.Success) {
      setImgUrl(FACE_GRID_SUCCESS);
    } else {
      setImgUrl(FACE_GRID_DEFAULT);
    }
  }, [gestureFeedbackMsg]);

  return (
    <CameraGuideContainer>
      <FadeInOut timing={300}>
        {gestureFeedbackMsg !== GestureFeedbackMessages.Success && (
          <StaticImg
            src={FACE_GRID_DEFAULT}
            alt={gestureFeedbackMsg || ""}
            width={1000}
            height={1000}
            $responsive
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              zIndex: 300,
            }}
          />
        )}
      </FadeInOut>

      <FadeInOut timing={100}>
        {gestureFeedbackMsg === GestureFeedbackMessages.Success && (
          <StaticImg
            src={FACE_GRID_SUCCESS}
            alt={gestureFeedbackMsg || ""}
            width={1000}
            height={1000}
            $responsive
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              zIndex: 400,
            }}
          />
        )}
      </FadeInOut>
    </CameraGuideContainer>
  );
}
