import { useEffect } from "react";
import { useSteps } from "@/app/lib/context/step-context";
import { useCameraContext } from "@/app/lib/context/camera-context";
import ButtonPrimary from "@/app/components/Button/ButtonPrimary";

import StaticImg from "@/app/components/StaticImg";
import { StyledPhotoContainer } from "@/app/components/Photo/index.styles";
import ButtonSecondary from "@/app/components/Button/ButtonSecondary";
import { StyledActionsContainer } from "@/app/styles/GlobalStyles";
import Prompt from "@/app/components/Prompt";

// For testing
import GesturePrompt from "@/app/components/GesturePrompt";
import { downloadPhoto } from "@/app/lib/utils/download-photo";

export default function CameraStep2() {
  const { handleBgRemoval, photos, setPhotos, setShowCountdown } =
    useCameraContext();
  const { handleNextStep, setCurrentStep } = useSteps();

  useEffect(() => {
    setShowCountdown(false);
  }, []);

  return (
    <>
      <StyledPhotoContainer>
        <StaticImg
          src={photos[0]}
          alt="Select the image or re-take your photo."
          // sizes="100vw"
          style={{
            backgroundColor: "white",
            borderRadius: 16,
            height: "auto",
            objectFit: "cover",
            transform: "scaleX(-1)",
            width: "100%",
          }}
          width={1000}
          height={1000}
        />
      </StyledPhotoContainer>

      <Prompt>How does it look?</Prompt>
      <StyledActionsContainer>
        <ButtonPrimary
          // $block="true"
          // label="Use photo"
          label="Continue"
          onClick={() => {
            // downloadPhoto(photos[0]);
            handleBgRemoval();
            handleNextStep();
          }}
        />
        <ButtonSecondary
          label="Retake"
          onClick={() => {
            setCurrentStep(1);
            setPhotos([]);
          }}
        />
      </StyledActionsContainer>
      {/* <StyledCol> */}
      {/* <StyledPhotoContainer> */}

      {/* </StyledPhotoContainer> */}
      {/* </StyledCol> */}
      {/* <StyledBottomCol> */}

      {/* </StyledBottomCol> */}
    </>
  );
}
