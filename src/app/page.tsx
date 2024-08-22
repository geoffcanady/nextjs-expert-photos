"use client";

import { Leva } from "leva";
import { useSteps } from "@/app/lib/context/step-context";
import { CameraProvider } from "@/app/lib/context/camera-context";
import { HumanProvider } from "@/app/lib/context/human-context";
import OnboardingStep1 from "@/app/components/OnboardingSteps/OnboardingStep1";
import CameraStep1 from "@/app/components/CameraSteps/CameraStep1";
import CameraStep2 from "@/app/components/CameraSteps/CameraStep2";
import CameraStep3 from "@/app/components/CameraSteps/CameraStep3";
import CameraStep4 from "@/app/components/CameraSteps/CameraStep4";
import {
  StyledAppContainer,
  StyledMainCol,
  StyledRadialBlur,
} from "@/app/styles/GlobalStyles";
import RadialGrad from "./components/RadialGrad";

export default function Home() {
  const { currentStep } = useSteps();
  // console.log("currentStep: ", currentStep);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <OnboardingStep1 />;
      case 2:
        return <CameraStep1 />;
      case 3:
        return <CameraStep2 />;
      case 4:
        return <CameraStep3 />;
      case 5:
        return <CameraStep4 />;
    }
  };

  return (
    <StyledAppContainer>
      <StyledMainCol>
        <Leva collapsed hidden />
        <CameraProvider>
          <HumanProvider>{renderStep()}</HumanProvider>
        </CameraProvider>
      </StyledMainCol>
      {/* <RadialGrad /> */}
      <StyledRadialBlur />
    </StyledAppContainer>
  );
}
