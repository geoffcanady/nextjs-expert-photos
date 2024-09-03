import { useSteps } from "@/app/lib/context/step-context";
import { useCameraContext } from "@/app/lib/context/camera-context";
import { StyledPhotoContainer } from "@/app/components/Photos/index.styles";
import Prompt from "@/app/components/Prompt";
import StaticImg from "@/app/components/StaticImg";
import ButtonPrimary from "@/app/components/Button/ButtonPrimary";
import ButtonSecondary from "../Button/ButtonSecondary";
import {
  StyledBottomCol,
  StyledCol,
  StyledActionsContainer,
  StyledActionsContent,
} from "@/app/styles/GlobalStyles";
import Sparkles from "../Sparkles";

export default function CameraStep4() {
  const { handleBgReset, imgBgRemovedUrl, setPhotos } = useCameraContext();
  const { setCurrentStep } = useSteps();

  return (
    <>
      <StyledCol>
        <StyledPhotoContainer>
          <Sparkles />
          {imgBgRemovedUrl && (
            <StaticImg
              src={imgBgRemovedUrl}
              alt="Select the image or re-take your photo."
              style={{
                backgroundColor: "white",
                borderRadius: "50%",
                boxShadow: "0px 4px 16px 0 rgba(0, 0, 0, 0.2)",
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
      </StyledCol>

      <StyledBottomCol>
        <StyledActionsContent>
          <Prompt>
            Well done! <br />
            If everything looks good, click Submit photo.
          </Prompt>
          <StyledActionsContainer>
            <ButtonSecondary
              label="Retake"
              onClick={() => {
                handleBgReset();
                setCurrentStep(2);
                setPhotos([]);
              }}
              $block="true"
            />
            <ButtonPrimary
              label="Submit photo"
              onClick={() => {}}
              $block="true"
            />
          </StyledActionsContainer>
        </StyledActionsContent>
      </StyledBottomCol>
    </>
  );
}
