import {
  AspectRatio,
  FacingMode,
  Stream,
  SetStream,
  SetNumberOfCameras,
  SetNotSupported,
  SetPermissionDenied,
  Navigator,
} from "@/app/lib/types/types";
import getStreamResolution from "./get-stream-resolution";
import { useGlobalContext } from "../context/global-context";

interface CameraStreamProps {
  aspectRatio: AspectRatio;
  stream: Stream;
  setStream: SetStream;
  currentFacingMode: FacingMode;
  videoSourceDeviceId: string | undefined;
  setNumberOfCameras: SetNumberOfCameras;
  setNotSupported: SetNotSupported;
  setPermissionDenied: SetPermissionDenied;
  cameraZoom: number;
  // zoom?: number;
  // minZoom?: number;
  // maxZoom?: number;
}

export const initCameraStream = ({
  aspectRatio,
  cameraZoom,
  currentFacingMode,
  stream,
  setStream,
  setNumberOfCameras,
  setNotSupported,
  setPermissionDenied,
  videoSourceDeviceId,
}: CameraStreamProps) => {
  if (stream) {
    stream.getTracks().forEach((track) => {
      track.stop();
    });
  }

  const constraints = {
    audio: false,
    video: {
      deviceId: videoSourceDeviceId
        ? { exact: videoSourceDeviceId }
        : undefined,
      facingMode: currentFacingMode,
      width: { ideal: aspectRatio === "cover" ? 1280 : 1080 },
      height: { ideal: aspectRatio === "cover" ? 720 : 1080 },

      zoom: {
        // min: 1.0, // default min
        // max: 10.0, // default max
        ideal: cameraZoom,
      },
    },
    // advanced: [{ zoom: 10.0 }],
  };

  const navigatorExtended: Navigator = navigator as Navigator;

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        setStream(handleSuccess(stream, setNumberOfCameras));
        getStreamResolution(stream);
      })
      .catch((err) => {
        handleError(err, setNotSupported, setPermissionDenied);
      });
  } else if (
    navigatorExtended.getUserMedia ||
    navigatorExtended.webkitGetUserMedia ||
    navigatorExtended.mozGetUserMedia ||
    navigatorExtended.msGetUserMedia
  ) {
    const getUserMedia =
      navigatorExtended.getUserMedia ||
      navigatorExtended.webkitGetUserMedia ||
      navigatorExtended.mozGetUserMedia ||
      navigatorExtended.msGetUserMedia;

    getUserMedia?.call(
      navigator,
      constraints,
      (stream: MediaStream) => {
        setStream(handleSuccess(stream, setNumberOfCameras));
      },
      (err: Error) => {
        handleError(err, setNotSupported, setPermissionDenied);
      }
    );
  } else {
    setNotSupported(true);
  }
};

export const handleSuccess = (
  stream: MediaStream,
  setNumberOfCameras: SetNumberOfCameras
) => {
  navigator.mediaDevices
    .enumerateDevices()
    .then((r) =>
      setNumberOfCameras(r.filter((i) => i.kind === "videoinput").length)
    );
  return stream;
};

export const handleError = (
  error: Error,
  setNotSupported: SetNotSupported,
  setPermissionDenied: SetPermissionDenied
) => {
  console.error(error);
  // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
  if (
    error.name === "PermissionDeniedError" ||
    error.name === "NotAllowedError"
  ) {
    setPermissionDenied(true);
  } else {
    setNotSupported(true);
  }
};
