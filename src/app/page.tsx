"use client";

import { useSteps } from "@/app/lib/context/step-context";
import OnboardingStep1 from "@/app/components/OnboardingSteps/OnboardingStep1";
import CameraStep1 from "@/app/components/CameraSteps/CameraStep1";
import CameraStep2 from "@/app/components/CameraSteps/CameraStep2";
import CameraStep3 from "@/app/components/CameraSteps/CameraStep3";
import CameraStep4 from "@/app/components/CameraSteps/CameraStep4";
import CameraStepFail from "./components/CameraSteps/CameraStepFail";
import CameraStepError from "@/app/components/CameraSteps/CameraStepError";
import { StyledAppContainer } from "@/app/styles/GlobalStyles";
import Navbar from "./components/Navbar";


export default function Home() {
  const { currentStep } = useSteps();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CameraStep1 />;
      case 2:
        return <CameraStep2 />;
      case 3:
        return <CameraStep3 />;
      case 4:
        return <CameraStep4 />;
      case "hat-fail":
        return <CameraStepFail />;
      case "photo-error":
        return <CameraStepError />;
      default:
        return <CameraStep1 />;
    }
  };

  return (
    <>
      <Navbar />
      <StyledAppContainer>{renderStep()}</StyledAppContainer>
    </>
  );
}
