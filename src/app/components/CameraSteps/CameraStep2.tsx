import { useSteps } from "@/app/lib/context/step-context";
import { useCameraContext } from "@/app/lib/context/camera-context";
import ButtonPrimary from "@/app/components/Button/ButtonPrimary";
import Prompt from "@/app/components/Prompt";
import StaticImg from "@/app/components/StaticImg";
import { StyledPhotoContainer } from "@/app/components/Photos/index.styles";
import ButtonSecondary from "@/app/components/Button/ButtonSecondary";
import {
  StyledBottomCol,
  StyledCol,
  StyledActionsContainer,
  StyledActionsContent,
} from "@/app/styles/GlobalStyles";

export default function CameraStep2() {
  const { handleBgRemoval, photos, setPhotos } = useCameraContext();
  const { handleNextStep, handlePrevStep } = useSteps();

  return (
    <>
      <StyledCol>
        <StyledPhotoContainer>
          <StaticImg
            src={photos[0]}
            alt="Select the image or re-take your photo."
            // sizes="100vw"
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
          <Prompt $alignment="center">How does it look?</Prompt>
          <StyledActionsContainer>
            <ButtonSecondary
              $block="true"
              label="Retake"
              onClick={() => {
                handlePrevStep();
                setPhotos([]);
              }}
            />
            <ButtonPrimary
              $block="true"
              label="Use photo"
              onClick={() => {
                handleBgRemoval();
                handleNextStep();
              }}
            />
          </StyledActionsContainer>
        </StyledActionsContent>
      </StyledBottomCol>
    </>
  );
}
