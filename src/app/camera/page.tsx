"use client";

// import dynamic from "next/dynamic";

import { CameraProvider } from "@/app/lib/context/camera-context";
import { HumanProvider } from "@/app/lib/context/human-context";
import { StyledAppContainer } from "@/app/styles/GlobalStyles";
import CameraSteps from "@/app/components/CameraSteps/";

// const CameraSteps = dynamic(() => import("@/app/components/CameraSteps/"), {
//   loading: () => <p>Loading...</p>,
//   ssr: false,
// });

export default function CameraPage() {
  return (
    <StyledAppContainer>
      <CameraProvider>
        <HumanProvider>
          <CameraSteps />
        </HumanProvider>
      </CameraProvider>
    </StyledAppContainer>
  );
}
