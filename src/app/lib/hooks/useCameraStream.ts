import { useState, useEffect } from "react";
import { initCameraStream } from "@/app/lib/utils/camera-utils";
import { FacingMode, Stream } from "@/app/lib/types/types";

export const useCameraStream = ({
  initialFacingMode,
  videoSourceDeviceId,
}: {
  initialFacingMode: FacingMode;
  videoSourceDeviceId: string | undefined;
}) => {
  const [stream, setStream] = useState<Stream>(null);
  const [numberOfCameras, setNumberOfCameras] = useState<number>(0);
  const [currentFacingMode, setCurrentFacingMode] =
    useState<FacingMode>(initialFacingMode);
  const [notSupported, setNotSupported] = useState<boolean>(false);
  const [permissionDenied, setPermissionDenied] = useState<boolean>(false);

  useEffect(() => {
    const updateStreamAndCameras = async () => {
      initCameraStream({
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
    currentFacingMode,
    stream,
    numberOfCameras,
    notSupported,
    permissionDenied,
    switchCamera,
  };
};
