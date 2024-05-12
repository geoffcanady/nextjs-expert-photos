// @ts-nocheck
"use client";

import { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/navigation";
import { CameraType } from "@/app/lib/types/types";
import { AssetPrefixes, GestureFeedbackMessages } from "@/app/lib/types/enums";
import { useSteps } from "@/app/lib/context/step-context";
import { useCameraContext } from "@/app/lib/context/camera-context";
import { useHumanContext } from "@/app/lib/context/human-context";
import { useGestureFeedback } from "@/app/lib/hooks/useGestureFeedback";
import { messages } from "@/app/lib/constants/messages";
import Actions from "@/app/components/Actions";
import ButtonOutline from "@/app/components/Button/ButtonOutline";
import { Camera } from "@/app/components/Camera/Camera";
import CameraButton from "@/app/components/CameraButton";
import CameraDrawer from "@/app/components/CameraDrawer";
import CameraGuide from "@/app/components/CameraGuide";
import DetectionOutput from "@/app/components/DetectionOutput/DetectionOutput";
import FadeInOut from "@/app/components/FadeInOut";
import { FixedHeader } from "@/app/components/Header";
import { IconArrowLeft, IconCameraToggle } from "@/app/components/Icons";
import Prompt from "@/app/components/Prompt";
import Rotation from "@/app/components/Rotation";
import StaticImg from "@/app/components/StaticImg";
import { StyledCameraLoadingContainer } from "@/app/components/Loader/index.styles";
import { StyledCanvasContainer } from "@/app/components/Camera/Camera.styles";
import { CameraLoader } from "../Loader";

/**
 * Using the dynamic import results in a null cameraRef
 * import dynamic from 'next/dynamic';
 * const Camera = dynamic(() => import('./Camera/Camera'), {
 * loading: () => <h1>Loading...</h1>,
 * ssr: false,
 * });
 */

export default function CameraStep1() {
  // const router = useRouter();
  // const handlePrevStep = () => {
  //   router.push("/");
  // };
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [activeDeviceId, setActiveDeviceId] = useState<string | undefined>(
    undefined
  );
  const [activeCamera, setActiveCamera] = useState<string>("front");
  const [disabled, setDisabled] = useState<boolean>(true);

  const camera = useRef<CameraType>(null);
  const {
    detectionResults,
    handleTakePhoto,
    isVideoReady,
    setIsVideoReady,
    showFade,
  } = useCameraContext();
  const { handleNextStep, handlePrevStep } = useSteps();
  const { gestureFeedbackMsg } = useGestureFeedback(detectionResults);
  const { controls } = useHumanContext();

  const toggleCamera = () => {
    setActiveCamera((prevCamera) =>
      prevCamera === "front" ? "back" : "front"
    );
  };

  // useEffect(() => {
  //   console.log("isVideoReady: ", isVideoReady);
  // }, [isVideoReady]);

  useEffect(() => {
    if (gestureFeedbackMsg === GestureFeedbackMessages.None) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [gestureFeedbackMsg]);

  useEffect(() => {
    (async () => {
      const devices = await navigator?.mediaDevices?.enumerateDevices();

      if (devices) {
        const videoDevices = devices.filter((i) => i.kind == "videoinput");
        setActiveDeviceId(videoDevices[0].deviceId);
        setDevices(videoDevices);

        if (videoDevices.length > 1) {
          const newActiveDeviceId =
            activeCamera === "front"
              ? videoDevices[0].deviceId
              : videoDevices[1].deviceId;
          setActiveDeviceId(newActiveDeviceId);
        }
      }
    })();
  }, [devices, activeCamera, activeDeviceId]);

  return (
    <>
      <StyledCanvasContainer $aspectratio={1 / 1}>
        <FixedHeader />
        {showFade && <FadeInOut duration={300} />}
        <>
          {isVideoReady ? (
            <CameraGuide gestureFeedbackMsg={gestureFeedbackMsg} />
          ) : (
            <CameraLoader />
          )}
          <Camera
            ref={camera}
            aspectRatio="cover"
            errorMessages={messages.errors}
            numberOfCamerasCallback={() => {}}
            // numberOfCamerasCallback={(i: any) => console.log("cam callback: ", i)}
            // numberOfCamerasCallback={(i) => setNumberOfCameras(i)}
            videoSourceDeviceId={activeDeviceId}
            videoReadyCallback={() => {
              setIsVideoReady(true);
            }}
          />
        </>
      </StyledCanvasContainer>
      <CameraDrawer>
        <Prompt>{gestureFeedbackMsg}</Prompt>

        {/**
         * Debugging output
         */}
        <div style={{ position: "relative" }}>
          {detectionResults && controls?.showResults && (
            <DetectionOutput detectionResults={detectionResults} $micro />
          )}
        </div>

        <Actions>
          <ButtonOutline
            icon={<IconArrowLeft />}
            onClick={() => handlePrevStep()}
          />
          <CameraButton
            onClick={() => {
              handleTakePhoto(camera);

              setTimeout(() => {
                handleNextStep();
                setIsVideoReady(false);
              }, 300);
            }}
            disabled={!isVideoReady || disabled}
          />
          <ButtonOutline
            icon={<IconCameraToggle />}
            onClick={() => toggleCamera()}
          />
        </Actions>
      </CameraDrawer>
    </>
  );
}
