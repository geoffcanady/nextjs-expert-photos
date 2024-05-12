"use client";

import { useRouter } from "next/navigation";
import { AssetPrefixes } from "@/app/lib/types/enums";
import { useSteps } from "@/app/lib/context/step-context";
import Actions from "@/app/components/Actions";
import ButtonOutline from "@/app/components/Button/ButtonOutline";
import ButtonPrimary from "@/app/components/Button/ButtonPrimary";
import FadeIn from "@/app/components/Fade/FadeIn";
import Header from "@/app/components/Header";
import { IconArrowLeft } from "@/app/components/Icons";
import Stage from "@/app/components/Stage";
import Prompt from "@/app/components/Prompt";
import StaticImg from "@/app/components/StaticImg";
import { GradBg } from "@/app/styles/GlobalStyles";

export default function OnboardingStep3() {
  const { handlePrevStep, handleNextStep } = useSteps();
  const router = useRouter();
  const handleRoute = () => {
    router.push("/camera");
  };

  return (
    <GradBg>
      <Header />
      <FadeIn>
        <Stage>
          <StaticImg
            src={`${AssetPrefixes.SbsegExpertPhotos}/onboarding-take-photo-2.png`}
            alt="Have you found a good place to take a photo?."
            width={1000}
            height={1000}
            $responsive
          />
        </Stage>
        <Prompt>Have you found a good place to take a photo?</Prompt>
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
