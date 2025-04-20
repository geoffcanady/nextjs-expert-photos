"use client";

// import dynamic from "next/dynamic";
import CameraStep1 from "@/app/components/CameraSteps/CameraStep1";
import CameraStep2 from "@/app/components/CameraSteps/CameraStep2";
import CameraStep3 from "@/app/components/CameraSteps/CameraStep3";
import { useSteps } from "@/app/lib/context/step-context";

// const CameraStep1 = dynamic(
//   () => import("@/app/components/CameraSteps/CameraStep1"),
//   {
//     loading: () => <p>Loading...</p>,
//     ssr: false,
//   }
// );

export default function CameraSteps() {
  const { currentStep } = useSteps();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CameraStep1 />;
      case 2:
        return <CameraStep2 />;
      case 3:
        return <CameraStep3 />;
      // case 4:
      //   return <CameraStep4 />;
      // case 5:
      //   return <CameraStep5 />;
    }
  };

  return renderStep();
}
