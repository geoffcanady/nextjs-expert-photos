import { useState, useEffect } from "react";
import { AspectRatio } from "@/app/lib/types/types";
import { initCameraStream } from "@/app/lib/utils/camera-utils";
import { Stream } from "@/app/lib/types/types";
import { useCameraContext } from "../context/camera-context";

export const useCameraStream = ({
  aspectRatio,
  videoSourceDeviceId,
}: {
  aspectRatio: AspectRatio;
  videoSourceDeviceId: string | undefined;
}) => {
  const [stream, setStream] = useState<Stream>(null);
  const [numberOfCameras, setNumberOfCameras] = useState<number>(0);
  const [notSupported, setNotSupported] = useState<boolean>(false);
  const [permissionDenied, setPermissionDenied] = useState<boolean>(false);
  const { currentFacingMode, setCurrentFacingMode } = useCameraContext();

  useEffect(() => {
    const updateStreamAndCameras = async () => {
      initCameraStream({
        aspectRatio,
        currentFacingMode,
        stream,
        setStream,
        setNumberOfCameras,
        setNotSupported,
        setPermissionDenied,
        videoSourceDeviceId,
      });
    };

    updateStreamAndCameras();
  }, [currentFacingMode, videoSourceDeviceId]);

  const switchCamera = () => {
    if (numberOfCameras < 1) {
      throw new Error("No camera accessible.");
    } else if (numberOfCameras === 1) {
      console.warn("Only one camera accessible, unable to switch.");
      return currentFacingMode;
    }
    const newFacingMode = currentFacingMode === "user" ? "environment" : "user";
    setCurrentFacingMode(newFacingMode);
    return newFacingMode;
  };

  return {
    stream,
    numberOfCameras,
    notSupported,
    permissionDenied,
    switchCamera,
  };
};
