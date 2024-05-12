import { useEffect } from "react";
import { light } from "@design-tokens/intuit";
import { useSteps } from "@/app/lib/context/step-context";
import { useCameraContext } from "@/app/lib/context/camera-context";
import { GradBg } from "@/app/styles/GlobalStyles";
import Header from "@/app/components/Header";
import { OverlayLoader } from "@/app/components/Loader";
import Prompt from "@/app/components/Prompt";
import StaticImg from "@/app/components/StaticImg";
import { StyledPhotoContainer } from "@/app/components/Photos/index.styles";

export default function CameraStep3() {
  const { photos, isBgRemoved } = useCameraContext();
  const { handleNextStep } = useSteps();

  useEffect(() => {
    if (isBgRemoved) {
      handleNextStep();
    }
  }, [isBgRemoved]);

  return (
    <GradBg>
      <Header />
      <StyledPhotoContainer>
        <OverlayLoader />
        <StaticImg
          src={photos[0]}
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
      </StyledPhotoContainer>
      <Prompt>
        Removing background...
        <br /> This should just take a moment
      </Prompt>
    </GradBg>
  );
}
