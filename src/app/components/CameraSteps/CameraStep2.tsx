import { light } from "@design-tokens/intuit";
import { useSteps } from "@/app/lib/context/step-context";
import { useCameraContext } from "@/app/lib/context/camera-context";
import Actions from "@/app/components/Actions";
import ButtonOutline from "@/app/components/Button/ButtonOutline";
import ButtonPrimary from "@/app/components/Button/ButtonPrimary";
import Header from "@/app/components/Header";
import { GradBg } from "@/app/styles/GlobalStyles";
import Prompt from "@/app/components/Prompt";
import StaticImg from "@/app/components/StaticImg";
import { StyledCanvasContainer } from "@/app/components/Camera/Camera.styles";
import { StyledPhotoContainer } from "@/app/components/Photos/index.styles";

export default function CameraStep2() {
  const { handleBgRemoval, photos, setPhotos } = useCameraContext();
  const { handleNextStep, handlePrevStep } = useSteps();

  return (
    <GradBg>
      <Header />
      <StyledCanvasContainer $aspectratio={1 / 1}>
        <StyledPhotoContainer>
          <StaticImg
            src={photos[0]}
            alt="Select the image or re-take your photo."
            // sizes="100vw"
            style={{
              backgroundColor: "white",
              borderRadius: light.radius.radiusCircle,
              height: "auto",
              objectFit: "cover",
              transform: "scaleX(-1)",
              width: "100%",
            }}
            width={1000}
            height={1000}
          />
        </StyledPhotoContainer>
      </StyledCanvasContainer>
      <Prompt>How does it look?</Prompt>
      <Actions>
        <ButtonOutline
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
      </Actions>
    </GradBg>
  );
}
