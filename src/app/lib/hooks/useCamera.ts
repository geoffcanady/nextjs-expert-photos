import { useCallback, RefObject } from 'react';
import { CameraProps } from '../types/types';

interface UseCameraProps {
  videoRef: RefObject<HTMLVideoElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
  containerRef: RefObject<HTMLDivElement>;
  errorMessages: Partial<CameraProps['errorMessages']>;
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

    const playerWidth = videoRef.current?.videoWidth || 1280;
    const playerHeight = videoRef.current?.videoHeight || 720;
    const playerAR = playerWidth / playerHeight;

    const canvasWidth = containerRef.current?.offsetWidth || 1280;
    const canvasHeight = containerRef.current?.offsetHeight || 1280;
    const canvasAR = canvasWidth / canvasHeight;

    let sX, sY, sW, sH;

    if (playerAR > canvasAR) {
      sH = playerHeight;
      sW = playerHeight * canvasAR;
      sX = (playerWidth - sW) / 2;
      sY = 0;
    } else {
      sW = playerWidth;
      sH = playerWidth / canvasAR;
      sX = 0;
      sY = (playerHeight - sH) / 2;
    }

    canvasRef.current.width = sW;
    canvasRef.current.height = sH;

    const context = canvasRef.current.getContext('2d');
    if (context && videoRef?.current) {
      context.drawImage(videoRef.current, sX, sY, sW, sH, 0, 0, sW, sH);
    }

    return canvasRef.current.toDataURL('image/jpeg');
  }, [videoRef, canvasRef, containerRef, errorMessages]);

  return { takePhoto };
};
