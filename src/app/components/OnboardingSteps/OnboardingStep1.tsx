"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { light } from "@design-tokens/intuit";
import { AssetPrefixes } from "@/app/lib/types/enums";
import { useSteps } from "@/app/lib/context/step-context";
import Actions from "@/app/components/Actions";
import ButtonPrimary from "@/app/components/Button/ButtonPrimary";
import { GradBg } from "@/app/styles/GlobalStyles";
import StaticImg from "@/app/components/StaticImg";

const StyledIntro = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  padding: ${light.size.size8};
`;

const StyledIntroHero = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  text-align: center;
`;

const StyledIntroTitle = styled.h1`
  color: #fff;
  text-align: center;
  font-size: ${light.fontSize.fontSize7};
  font-style: normal;
  font-weight: normal;
  line-height: ${light.lineHeight.lineHeight5};

  span {
    font-size: ${light.fontSize.fontSize4};
  }
`;

const StyledLead = styled.p`
  color: #fff;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: ${light.lineHeight.lineHeight4};
  margin-top: auto;
`;

export default function OnboardingStep1() {
  const router = useRouter();
  const { handleNextStep } = useSteps();
  // const { humanIsReady, humanRef } = useHumanContext();
  // console.log("humanIsReady: ", humanIsReady, "humanRef: ", humanRef);

  useEffect(() => {
    router.prefetch("/camera");
  }, [router]);

  return (
    <GradBg>
      <StyledIntro>
        <StyledIntroHero>
          <div>
            <StaticImg
              src={`${AssetPrefixes.SbsegExpertPhotos}/logo-photo-booth-2.png`}
              alt="Welcome to the Expert Photo Booth."
              width={86}
              height={86}
            />
            <StyledIntroTitle>
              <span>Welcome to the</span> <br />
              Expert Photo Booth
            </StyledIntroTitle>
          </div>
        </StyledIntroHero>
        <StyledLead>
          In the next steps we will guide you though step by step on what how to
          take a profile image.
        </StyledLead>
      </StyledIntro>
      <Actions>
        <ButtonPrimary
          label="Continue"
          onClick={handleNextStep}
          $block="true"
        />
      </Actions>
    </GradBg>
  );
}
