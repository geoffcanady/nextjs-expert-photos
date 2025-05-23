"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";
import { useSteps } from "@/app/lib/context/step-context";
import { iconCameraBlue } from "@/app/lib/base64/icon-camera-blue";
import ButtonPrimary from "@/app/components/Button/ButtonPrimary";
import StaticImg from "@/app/components/StaticImg";

import { StyledActionsContainer } from "@/app/styles/GlobalStyles";

const StyledIntroTitle = styled.h1`
  color: #236cff;
  text-align: center;
  font-size: 34px;
  font-style: normal;
  font-weight: normal;
  line-height: 34px;
`;

export default function OnboardingStep1() {
  const router = useRouter();
  const { handleNextStep } = useSteps();
  // const { humanIsReady, humanRef } = useHumanContext();
  // console.log("humanIsReady: ", humanIsReady, "humanRef: ", humanRef);

  return (
    <>
      <StaticImg
        src={iconCameraBlue}
        alt="Welcome to the Expert Photo Booth."
        width={86}
        height={86}
      />
      <StyledIntroTitle>Expert Photo Booth</StyledIntroTitle>
      <StyledActionsContainer>
        <ButtonPrimary label="Start" onClick={handleNextStep} />
      </StyledActionsContainer>
    </>
  );
}
