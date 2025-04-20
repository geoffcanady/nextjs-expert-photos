"use client";

import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { CameraType, FacingMode } from "@/app/lib/types/types";
import { GestureFeedbackMessages } from "@/app/lib/types/enums";
import { messages } from "@/app/lib/constants/messages";

import { useGlobalContext } from "@/app/lib/context/global-context";
import { useSteps } from "@/app/lib/context/step-context";
import { useCameraContext } from "@/app/lib/context/camera-context";

import { useGestureFeedback } from "@/app/lib/hooks/useGestureFeedback";
import useHandleKeyDown from "@/app/lib/hooks/useHandleKeydown";

import ButtonSecondary from "@/app/components/Button/ButtonSecondary";
import ButtonPrimary from "@/app/components/Button/ButtonPrimary";
import { Camera } from "@/app/components/Camera/Camera";
import CameraSwitchButton from "@/app/components/CameraSwitchButton";
import CameraBanner from "@/app/components/CameraBanner";
import CameraButton from "@/app/components/CameraButton";
import CameraFlash from "@/app/components/CameraFlash";
import CameraGuide from "@/app/components/CameraGuide";
import { CameraLoader } from "@/app/components/Loader";
import DetectionOutput from "@/app/components/DetectionOutput/DetectionOutput";
import { IconCamera } from "@/app/components/Icons";
import GlobalControls from "@/app/components/GlobalControls/global-controls";
import { StyledCanvasContainer } from "@/app/components/Camera/Camera.styles";

import {
  StyledActionsLeftCol,
  StyledDesktopActions,
  StyledMobileActions,
} from "@/app/styles/GlobalStyles";
import { CountdownAlt2 } from "@/app/components/Countdown/CountdownAlt2";

// For testing
import { CountdownAlt5 } from "../Countdown/CountdownAlt5";
import CameraBannerAlt from "../CameraBannerAlt";

/** Mobile */
// import CameraButton from "@/app/components/CameraButton";

const StyledSpacebarPompt = styled.div`
  color: #6b6c72;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding: 8px 0;

  span {
    background-color: rgba(197, 225, 255, 0.3);
    border-radius: 2px;
  }
`;

export default function CameraStep1() {
  const camera = useRef<CameraType>(null);
  const [activeDeviceId, setActiveDeviceId] = useState<string | undefined>(
    undefined
  );
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [activeCamera, setActiveCamera] = useState<string>("front");
  const [disabled, setDisabled] = useState<boolean>(true);

  const { handlePrevStep } = useSteps();
  const {
    count,
    detectionResults,
    isVideoReady,
    showCountdown,
    showFlash,
    handleTakePhoto,
    setCurrentFacingMode,
    setIsVideoReady,
  } = useCameraContext();
  const { gestureFeedbackMsg } = useGestureFeedback(detectionResults);
  const { countdownOption, showOutput } = useGlobalContext();

  // TODO: refactor to use `switchCamera` from `useCameraStream`.
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

  useHandleKeyDown({ camera, disabled });

  useEffect(() => {
    if (gestureFeedbackMsg === GestureFeedbackMessages.Success) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [gestureFeedbackMsg]);

  useEffect(() => {
    let isMounted = true;

    const fetchDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      if (!isMounted) return;

      const videoDevices = devices.filter((i) => i.kind === "videoinput");

      setDevices(videoDevices);

      setActiveDeviceId((prev) => {
        const newDeviceId =
          activeCamera === "front"
            ? videoDevices[0]?.deviceId
            : videoDevices[1]?.deviceId;

        return prev !== newDeviceId ? newDeviceId : prev;
      });
    };

    fetchDevices();

    return () => {
      isMounted = false;
    };
  }, [activeCamera]);

  return (
    <>
      <GlobalControls />
      <StyledCanvasContainer>
        {!isVideoReady && <CameraLoader />}
        {showFlash && <CameraFlash duration={300} />}
        {isVideoReady && !showCountdown && <CameraGuide />}

        <CameraBanner disabled={disabled} />

        {countdownOption === 2 && (
          <CountdownAlt2 show={showCountdown} count={count} />
        )}

        <Camera
          ref={camera}
          aspectRatio={1 / 1}
          errorMessages={messages.errors}
          numberOfCamerasCallback={() => {}}
          // numberOfCamerasCallback={(i) => setNumberOfCameras(i)}
          videoSourceDeviceId={activeDeviceId}
          videoReadyCallback={() => {
            setIsVideoReady(true);
          }}
        />
      </StyledCanvasContainer>

      {showOutput && (
        <DetectionOutput $micro detectionResults={detectionResults} />
      )}

      <StyledMobileActions>
        <StyledActionsLeftCol />
        <CameraButton
          onClick={() => handleTakePhoto(camera)}
          disabled={!isVideoReady || disabled || showCountdown}
        />
        <CameraSwitchButton onClick={() => toggleCamera()} />
      </StyledMobileActions>

      <StyledDesktopActions>
        <ButtonPrimary
          icon={<IconCamera />}
          label="Take photo"
          onClick={() => handleTakePhoto(camera)}
          disabled={!isVideoReady || disabled || showCountdown}
        />
        <StyledSpacebarPompt>
          Or hit <span>spacebar</span> to take photo
        </StyledSpacebarPompt>
        <ButtonSecondary label="Back" onClick={() => handlePrevStep()} />
      </StyledDesktopActions>
    </>
  );
}
