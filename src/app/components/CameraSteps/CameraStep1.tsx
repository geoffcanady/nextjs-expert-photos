"use client";

// import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { CameraType, FacingMode } from "@/app/lib/types/types";
import { GestureFeedbackMessages } from "@/app/lib/types/enums";
import { useSteps } from "@/app/lib/context/step-context";
import { useCameraContext } from "@/app/lib/context/camera-context";
import { useHumanContext } from "@/app/lib/context/human-context";
import { useGestureFeedback } from "@/app/lib/hooks/useGestureFeedback";
import { messages } from "@/app/lib/constants/messages";
import { Camera } from "@/app/components/Camera/Camera";
import CameraGuide from "@/app/components/CameraGuide";
import { CameraLoader } from "@/app/components/Loader";
import FadeInOut from "@/app/components/FadeInOut";
import GesturePrompt from "@/app/components/GesturePrompt";
import { StyledCanvasContainer } from "@/app/components/Camera/Camera.styles";
import ButtonSecondary from "@/app/components/Button/ButtonSecondary";
import ButtonPrimary from "../Button/ButtonPrimary";
import {
  StyledBottomCol,
  StyledCol,
  StyledActionsContainer,
  StyledActionsContent,
} from "@/app/styles/GlobalStyles";

/** Mobile */
import CameraButton from "@/app/components/CameraButton";
import DetectionOutput from "@/app/components/DetectionOutput/DetectionOutput";
import {
  IconArrowLeft,
  IconCamera,
  IconCameraToggle,
} from "@/app/components/Icons";

export default function CameraStep1() {
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
  const { currentFacingMode, setCurrentFacingMode } = useCameraContext();

  // To do: refactor to use `switchCamera` from `useCameraStream`.
  const toggleCamera = () => {
    setActiveCamera((prevCamera) => {
      let newCamera = prevCamera === "front" ? "back" : "front";

      if (newCamera === "front") {
        setCurrentFacingMode("user");
      } else {
        setCurrentFacingMode("environment");
      }

      return newCamera;
    });
  };

  useEffect(() => {
    if (gestureFeedbackMsg === GestureFeedbackMessages.Success) {
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
      <StyledCol>
        <StyledCanvasContainer $aspectratio={1 / 1}>
          {showFade && <FadeInOut duration={300} />}
          {isVideoReady ? (
            <CameraGuide gestureFeedbackMsg={gestureFeedbackMsg} />
          ) : (
            <CameraLoader />
          )}

          <Camera
            ref={camera}
            aspectRatio={1 / 1}
            errorMessages={messages.errors}
            numberOfCamerasCallback={() => {}}
            // numberOfCamerasCallback={(i: any) => console.log("cam callback: ", i)}
            // numberOfCamerasCallback={(i) => setNumberOfCameras(i)}
            videoSourceDeviceId={activeDeviceId}
            videoReadyCallback={() => {
              setIsVideoReady(true);
            }}
          />
        </StyledCanvasContainer>
      </StyledCol>

      <StyledBottomCol>
        <StyledActionsContent>
          <GesturePrompt>{isVideoReady && gestureFeedbackMsg}</GesturePrompt>
          <StyledActionsContainer>
            <ButtonSecondary label="Back" onClick={() => {}} $block="true" />
            <ButtonPrimary
              icon={<IconCamera />}
              label="Take photo"
              onClick={() => {
                handleTakePhoto(camera);
                setTimeout(() => {
                  handleNextStep();
                  setIsVideoReady(false);
                }, 300);
              }}
              disabled={!isVideoReady || disabled}
              $block="true"
            />
          </StyledActionsContainer>
        </StyledActionsContent>
      </StyledBottomCol>
    </>
  );
}
