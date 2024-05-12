import { light } from "@design-tokens/intuit";
import { useSteps } from "@/app/lib/context/step-context";
import { useCameraContext } from "@/app/lib/context/camera-context";
import Actions from "@/app/components/Actions";
import ButtonOutline from "@/app/components/Button/ButtonOutline";
import ButtonPrimary from "@/app/components/Button/ButtonPrimary";
import { GradBg } from "@/app/styles/GlobalStyles";
import Header from "@/app/components/Header";
import { IconArrowLeft } from "@/app/components/Icons";
import Prompt from "@/app/components/Prompt";
import StaticImg from "@/app/components/StaticImg";
import { StyledPhotoContainer } from "@/app/components/Photos/index.styles";

export default function CameraStep4() {
  const { handleBgReset, imgBgRemovedUrl, setPhotos } = useCameraContext();
  const { setCurrentStep } = useSteps();

  return (
    <GradBg>
      <Header />
      <StyledPhotoContainer>
        {imgBgRemovedUrl && (
          <StaticImg
            src={imgBgRemovedUrl}
            alt="Select the image or re-take your photo."
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
        )}
      </StyledPhotoContainer>
      <Prompt>
        Well done! If everything looks good, submit your official profile photo
      </Prompt>
      <Actions>
        <ButtonOutline
          icon={<IconArrowLeft />}
          onClick={() => {
            handleBgReset();
            setCurrentStep(4);
            setPhotos([]);
          }}
        />
        <ButtonPrimary label="Submit photo" onClick={() => {}} $block="true" />
      </Actions>
    </GradBg>
  );
}
