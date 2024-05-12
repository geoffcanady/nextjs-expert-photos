import { RefObject, useEffect, useState, useRef } from "react";
import { Human as HumanType, Result } from "@vladmandic/human";
import { useHumanContext } from "@/app/lib/context/human-context";

interface DetectAndDrawProps {
  humanRef: RefObject<HumanType> | null;
  videoRef: RefObject<HTMLVideoElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
  humanIsReady: boolean;
}

const useDetectAndDraw = ({
  humanRef,
  videoRef,
  canvasRef,
  humanIsReady,
}: DetectAndDrawProps) => {
  const [detectionResults, setDetectionResults] = useState<Result | null>(null);
  const timestampRef = useRef(0);
  const fpsRef = useRef(0);
  const { controls } = useHumanContext();

  useEffect(() => {
    if (
      !humanIsReady ||
      !humanRef ||
      !humanRef.current ||
      !videoRef.current ||
      !canvasRef.current
    )
      return;

    let animationFrameId: number;

    const detectAndDraw = async () => {
      if (humanRef.current && videoRef.current && canvasRef.current) {
        const results = await humanRef.current.detect(videoRef.current);
        const interpolated = humanRef.current.next(humanRef.current.result);

        if (controls?.showDetection) {
          // humanRef.current.draw.options.drawGestures = false;
          humanRef.current.draw.options.drawLabels = false;
          humanRef.current.draw.canvas(videoRef.current, canvasRef.current);
          humanRef.current.draw.all(canvasRef.current, interpolated);
        }

        const now = humanRef.current.now();

        if (typeof now === "number") {
          fpsRef.current = 1000 / (now - timestampRef.current);
          timestampRef.current = now;
        }

        setDetectionResults(results);
      }

      animationFrameId = requestAnimationFrame(detectAndDraw);
    };

    detectAndDraw();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [humanRef, videoRef, canvasRef, humanIsReady, controls]);

  return { detectionResults, fps: fpsRef.current };
};

export default useDetectAndDraw;
