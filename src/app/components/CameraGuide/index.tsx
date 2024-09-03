import { useEffect, useState } from "react";
import { GestureFeedbackMessages } from "@/app/lib/types/enums";
import StaticImg from "@/app/components/StaticImg";
import { faceOutlineDefault } from "@/app/lib/base64/face-outline-default";
import { faceOutlineSuccess } from "@/app/lib/base64/face-outline-success";
import { CameraGuideContainer } from "./index.styles";

export default function CameraGuide({
  gestureFeedbackMsg,
}: {
  gestureFeedbackMsg: string;
}) {
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    if (gestureFeedbackMsg === GestureFeedbackMessages.Success) {
      setImgUrl(faceOutlineSuccess);
    } else {
      setImgUrl(faceOutlineDefault);
    }
  }, [gestureFeedbackMsg]);

  return (
    <CameraGuideContainer>
      <StaticImg
        src={imgUrl}
        alt={
          gestureFeedbackMsg === GestureFeedbackMessages.Success
            ? "Take a photo"
            : "Center you face"
        }
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
    </CameraGuideContainer>
  );
}
