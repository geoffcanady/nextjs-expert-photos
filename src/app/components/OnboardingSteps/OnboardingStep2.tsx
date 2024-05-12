"use client";

import { AssetPrefixes } from "@/app/lib/types/enums";
import { useSteps } from "@/app/lib/context/step-context";
import Actions from "@/app/components/Actions";
import ButtonOutline from "@/app/components/Button/ButtonOutline";
import ButtonPrimary from "@/app/components/Button/ButtonPrimary";
import FadeIn from "@/app/components/Fade/FadeIn";
import Header from "@/app/components/Header";
import { IconArrowLeft } from "@/app/components/Icons";
import Prompt from "@/app/components/Prompt";
import Stage from "@/app/components/Stage";
import StaticImg from "@/app/components/StaticImg";
import { GradBg } from "@/app/styles/GlobalStyles";

export default function OnboardingStep2() {
  const { handlePrevStep, handleNextStep } = useSteps();

  return (
    <GradBg>
      <Header $fixed={false} />
      <FadeIn>
        <Stage>
          <StaticImg
            src={`${AssetPrefixes.SbsegExpertPhotos}/onboarding-lighting.webp`}
            alt="Make sure your face is lit, and avoid shadows."
            width={1000}
            height={1000}
            $responsive
          />
        </Stage>
        <Prompt $alignment="left">
          <ol>
            <li>Find a plain, light colored backdrop</li>
            <li>
              Make sure your face is lit, avoid shadows. Natural light is best
            </li>
          </ol>
        </Prompt>
      </FadeIn>
      <Actions>
        <ButtonOutline icon={<IconArrowLeft />} onClick={handlePrevStep} />
        <ButtonPrimary
          label="Continue"
          onClick={handleNextStep}
          $block="true"
        />
      </Actions>
    </GradBg>
  );
}
