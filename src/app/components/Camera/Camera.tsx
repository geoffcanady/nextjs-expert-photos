"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { CameraProps } from "@/app/lib/types/types";
import { useCameraContext } from "@/app/lib/context/camera-context";
import { useCameraStream } from "@/app/lib/hooks/useCameraStream";
import { useCamera } from "@/app/lib/hooks/useCamera";
import useDetectAndDraw from "@/app/lib/hooks/useDetectAndDraw";
import { StyledVideo, StyledErrorMessage, StyledCanvas } from "./Camera.styles";
import { useHumanContext } from "@/app/lib/context/human-context";

export const Camera = forwardRef<unknown, CameraProps>(
  (
    {
      aspectRatio = 1 / 1,
      errorMessages,
      numberOfCamerasCallback = () => null,
      videoReadyCallback = () => null,
      videoSourceDeviceId = undefined,
    },
    ref
  ) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    /**
     * Camera hooks & context
     */
    const { currentFacingMode, setDetectionResults } = useCameraContext();
    const { controls, humanIsReady, humanRef } = useHumanContext();

    const {
      numberOfCameras,
      notSupported,
      permissionDenied,
      stream,
      switchCamera,
    } = useCameraStream({ videoSourceDeviceId, aspectRatio });

    const { detectionResults, fps } = useDetectAndDraw({
      canvasRef,
      humanRef,
      humanIsReady,
      videoRef,
    });

    const { takePhoto } = useCamera({
      canvasRef,
      containerRef,
      errorMessages,
      videoRef,
    });

    useEffect(() => {
      if (stream && videoRef && videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      return () => {
        if (stream) {
          stream.getTracks().forEach((track) => {
            track.stop();
          });
        }
      };
    }, [stream]);

    useEffect(() => {
      numberOfCamerasCallback(numberOfCameras);
    }, [numberOfCameras]);

    useEffect(() => {
      setDetectionResults(detectionResults);
    }, [detectionResults, setDetectionResults]);

    /**
     * Exposes the camera operations to the parent component.
     */
    useImperativeHandle(ref, () => ({
      takePhoto,
      switchCamera,
      getNumberOfCameras: () => numberOfCameras,
    }));

    /**
     * Canvas resizing to match the video dimensions.
     */
    const resizeCanvas = useCallback(() => {
      if (videoRef.current && canvasRef.current) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
      }
    }, [videoRef, canvasRef]);

    useEffect(() => {
      const video = videoRef.current;

      if (video) {
        // Listen for when video metadata is loaded to adjust canvas size
        video.addEventListener("loadedmetadata", resizeCanvas);

        return () => {
          video.removeEventListener("loadedmetadata", resizeCanvas);
        };
      }
    }, [resizeCanvas]);

    return (
      <>
        {notSupported ? (
          <StyledErrorMessage>
            {errorMessages.noCameraAccessible}
          </StyledErrorMessage>
        ) : null}
        {permissionDenied ? (
          <StyledErrorMessage>
            {errorMessages.permissionDenied}
          </StyledErrorMessage>
        ) : null}
        <StyledVideo
          ref={videoRef}
          $aspectratio={aspectRatio}
          autoPlay={true}
          id="video"
          $mirrored={currentFacingMode === "user" ? true : false}
          muted={true}
          onLoadedData={() => {
            videoReadyCallback();
          }}
          playsInline={true}
          width={aspectRatio === "cover" ? "1280" : "1080"}
          height={aspectRatio === "cover" ? "720" : "1080"}
        />
        <StyledCanvas ref={canvasRef} $showCanvas={controls.showDetection} />
      </>
    );
  }
);

export default Camera;

Camera.displayName = "Camera";
