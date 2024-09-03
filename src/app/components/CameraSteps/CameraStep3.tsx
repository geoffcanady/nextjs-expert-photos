import { useEffect } from "react";
import { useSteps } from "@/app/lib/context/step-context";
import { useCameraContext } from "@/app/lib/context/camera-context";
import { OverlayLoader } from "@/app/components/Loader";
import Prompt from "@/app/components/Prompt";
import StaticImg from "@/app/components/StaticImg";
import { StyledPhotoContainer } from "@/app/components/Photos/index.styles";
import {
  StyledBottomCol,
  StyledCol,
  StyledActionsContent,
} from "@/app/styles/GlobalStyles";

export default function CameraStep3() {
  const { photos, isBgRemoved } = useCameraContext();
  const { handleNextStep } = useSteps();

  useEffect(() => {
    if (isBgRemoved) {
      handleNextStep();
    }
  }, [isBgRemoved]);

  return (
    <>
      <StyledCol>
        <StyledPhotoContainer>
          <OverlayLoader />
          <StaticImg
            src={photos[0]}
            alt="Select the image or re-take your photo."
            style={{
              backgroundColor: "white",
              borderRadius: "50%",
              height: "auto",
              objectFit: "cover",
              transform: "scaleX(-1)",
              width: "100%",
            }}
            width={1000}
            height={1000}
          />
        </StyledPhotoContainer>
      </StyledCol>
      <StyledBottomCol>
        <StyledActionsContent>
          <Prompt>
            Removing background...
            <br /> This should just take a moment
          </Prompt>
        </StyledActionsContent>
      </StyledBottomCol>
    </>
  );
}
