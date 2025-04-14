"use client";

import { useSteps } from "@/app/lib/context/step-context";
import { CameraProvider } from "@/app/lib/context/camera-context";
import { HumanProvider } from "@/app/lib/context/human-context";
import OnboardingStep1 from "@/app/components/OnboardingSteps/OnboardingStep1";
import CameraStep1 from "@/app/components/CameraSteps/CameraStep1";
import CameraStep2 from "@/app/components/CameraSteps/CameraStep2";
import CameraStep3 from "@/app/components/CameraSteps/CameraStep3";
import CameraStep4 from "@/app/components/CameraSteps/CameraStep4";
import CameraStepError from "@/app/components/CameraSteps/CameraStepError";
import {
  StyledAppContainer,
  StyledMainColHome,
} from "@/app/styles/GlobalStyles";
import { useEffect, useState } from "react";
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
      case "photo-error":
        return <CameraStepError />;
      default:
        return <CameraStep1 />;
    }
  };

  useEffect(() => {
    const setVhProperty = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVhProperty();
    window.addEventListener("resize", setVhProperty);

    return () => {
      window.removeEventListener("resize", setVhProperty);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ padding: 20, background: "#F4F5F8" }}>
        <StyledAppContainer>
          <StyledMainColHome>
            <CameraProvider>
              <HumanProvider>{renderStep()}</HumanProvider>
            </CameraProvider>
          </StyledMainColHome>
        </StyledAppContainer>
      </div>
    </>
  );
}
