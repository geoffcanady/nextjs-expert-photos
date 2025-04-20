import { useSteps } from "@/app/lib/context/step-context";
import { useCameraContext } from "@/app/lib/context/camera-context";
import { StyledPhotoContainer } from "@/app/components/Photo/index.styles";
import Prompt from "@/app/components/Prompt";
import StaticImg from "@/app/components/StaticImg";
import ButtonPrimary from "@/app/components/Button/ButtonPrimary";
import ButtonSecondary from "../Button/ButtonSecondary";
import { StyledActionsContainer } from "@/app/styles/GlobalStyles";

export default function CameraStep4() {
  const { resetCamera, imgBgRemovedUrl } = useCameraContext();
  const { setCurrentStep } = useSteps();

  return (
    <>
      <StyledPhotoContainer>
        {imgBgRemovedUrl && (
          <StaticImg
            src={imgBgRemovedUrl}
            alt="Select the image or re-take your photo."
            style={{
              backgroundColor: "white",
              borderRadius: 8,
              border: "solid 1px rgba(0, 0 , 0, 0.15)",
              height: "auto",
              objectFit: "cover",
              transform: "scaleX(-1)",
              width: "100%",
            }}
            width={1000}
            height={1000}
          />
        )}
      </StyledPhotoContainer>
      <Prompt>
        Well done!
        <span>If everything looks good, click Submit photo.</span>
      </Prompt>
      <StyledActionsContainer>
        <ButtonPrimary label="Submit and continue" onClick={() => {}} />
        <ButtonSecondary
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
