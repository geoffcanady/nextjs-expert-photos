import { useCallback, RefObject } from "react";
import { CameraProps } from "@/app/lib/types/types";
import { calculateCropDimensions } from "@/app/lib/utils/camera-calculations";

interface UseCameraProps {
  videoRef: RefObject<HTMLVideoElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
  containerRef: RefObject<HTMLDivElement>;
  errorMessages: Partial<CameraProps["errorMessages"]>;
}

export const useCamera = ({
  videoRef,
  canvasRef,
  containerRef,
  errorMessages,
}: UseCameraProps) => {
  const takePhoto = useCallback(() => {
    if (!canvasRef.current) {
      throw new Error(errorMessages.canvas);
    }

    const playerWidth = videoRef.current?.videoWidth || 1920;
    const playerHeight = videoRef.current?.videoHeight || 1080;
    const containerWidth = containerRef.current?.offsetWidth || 1080;
    const containerHeight = containerRef.current?.offsetHeight || 1080;

    const { sX, sY, sW, sH } = calculateCropDimensions(
      playerWidth,
      playerHeight,
      containerWidth,
      containerHeight
    );

    canvasRef.current.width = sW;
    canvasRef.current.height = sH;

    const context = canvasRef.current.getContext("2d");
    if (context && videoRef.current) {
      context.drawImage(videoRef.current, sX, sY, sW, sH, 0, 0, sW, sH);
    }

    return canvasRef.current.toDataURL("image/jpeg");
  }, [videoRef, canvasRef, containerRef, errorMessages]);

  return { takePhoto };
};
