// @ts-nocheck
"use client";

import { useEffect, useRef, useState } from "react";
import Camera from "@/app/components/Camera/Camera";
import { CameraType } from "@/app/lib/types/types";
import { messages } from "@/app/lib/constants/messages";
import { useCameraContext } from "@/app/lib/context/camera-context";
import { StyledCanvasContainer } from "../components/Camera/Camera.styles";
import DetectionOutput from "../components/DetectionOutput/DetectionOutput";
import { useHumanContext } from "../lib/context/human-context";

export default function CameraCanvas() {
  const camera = useRef<CameraType>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [activeDeviceId, setActiveDeviceId] = useState<string | undefined>(
    undefined
  );
  const { detectionResults, setIsVideoReady } = useCameraContext();
  const { controls } = useHumanContext();

  useEffect(() => {
    (async () => {
      const devices = await navigator?.mediaDevices?.enumerateDevices();

      if (devices) {
        const videoDevices = devices.filter((i) => i.kind == "videoinput");
        setActiveDeviceId(videoDevices[0].deviceId);
        setDevices(videoDevices);

        if (videoDevices.length > 1) {
          setActiveDeviceId(videoDevices[0].deviceId);
        }
      }
    })();
  }, [devices, activeDeviceId]);

  return (
    <div style={{ position: "relative" }}>
      {detectionResults && controls?.showResults && (
        <DetectionOutput detectionResults={detectionResults} />
      )}
      <StyledCanvasContainer $aspectratio="cover">
        <Camera
          ref={camera}
          aspectRatio="cover"
          errorMessages={messages.errors}
          numberOfCamerasCallback={() => {}}
          // numberOfCamerasCallback={(i: any) => console.log("cam callback: ", i)}
          // numberOfCamerasCallback={(i) => setNumberOfCameras(i)}
          videoSourceDeviceId={activeDeviceId}
          videoReadyCallback={() => setIsVideoReady(true)}
        />
      </StyledCanvasContainer>
    </div>
  );
}
