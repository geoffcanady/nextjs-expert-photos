import { useSteps } from "@/app/lib/context/step-context";
import { useCameraContext } from "@/app/lib/context/camera-context";
import Prompt from "@/app/components/Prompt";
import StaticImg from "@/app/components/StaticImg";
import ButtonPrimary from "@/app/components/Button/ButtonPrimary";
import { StyledPhotoContainer } from "@/app/components/Photo/index.styles";
import { StyledActionsContainer } from "@/app/styles/GlobalStyles";

export default function CameraStepError() {
  const { photos, resetCamera } = useCameraContext();
  const { setCurrentStep } = useSteps();

  return (
    <>
      <StyledPhotoContainer>
        <StaticImg
          src={photos[0]}
          alt="Re-take your photo."
          style={{
            backgroundColor: "white",
            borderRadius: 8,
            height: "auto",
            objectFit: "cover",
            transform: "scaleX(-1)",
            width: "100%",
          }}
          width={1000}
          height={1000}
        />
      </StyledPhotoContainer>
      <Prompt>
        Looks like we need to retake...
        <span>Please hold still during the countdown.</span>
      </Prompt>
      <StyledActionsContainer>
        <ButtonPrimary
          label="Retake"
          onClick={() => {
            resetCamera();
            setCurrentStep(1);
          }}
        />
      </StyledActionsContainer>
    </>
  );
}
