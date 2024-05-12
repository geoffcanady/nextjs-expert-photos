"use client";

import { useSteps } from "@/app/lib/context/step-context";
import { CameraProvider } from "@/app/lib/context/camera-context";
import { HumanProvider } from "@/app/lib/context/human-context";
import OnboardingStep1 from "@/app/components/OnboardingSteps/OnboardingStep1";
import OnboardingStep2 from "@/app/components/OnboardingSteps/OnboardingStep2";
import OnboardingStep3 from "@/app/components/OnboardingSteps/OnboardingStep3";
import CameraStep1 from "@/app/components/CameraSteps/CameraStep1";
import CameraStep2 from "@/app/components/CameraSteps/CameraStep2";
import CameraStep3 from "@/app/components/CameraSteps/CameraStep3";
import CameraStep4 from "@/app/components/CameraSteps/CameraStep4";
import { StyledAppContainer } from "@/app/styles/GlobalStyles";

export default function Home() {
  const { currentStep } = useSteps();
  // console.log("currentStep: ", currentStep);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <OnboardingStep1 />;
      case 2:
        return <OnboardingStep2 />;
      case 3:
        return <OnboardingStep3 />;
      case 4:
        return <CameraStep1 />;
      case 5:
        return <CameraStep2 />;
      case 6:
        return <CameraStep3 />;
      case 7:
        return <CameraStep4 />;
    }
  };

  return (
    <StyledAppContainer>
      <CameraProvider>
        <HumanProvider>{renderStep()}</HumanProvider>
      </CameraProvider>
    </StyledAppContainer>
  );
}
