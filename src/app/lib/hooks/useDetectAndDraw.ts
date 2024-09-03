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

  const detect = async () => {
    if (humanRef?.current && videoRef.current) {
      const results = await humanRef.current.detect(videoRef.current);
      setDetectionResults(results);
      return humanRef.current.next(humanRef.current.result);
    }
  };

  const draw = (interpolated: Result) => {
    if (
      humanRef?.current &&
      videoRef.current &&
      canvasRef?.current &&
      controls?.showDetection
    ) {
      humanRef.current.draw.options.drawLabels = false;
      humanRef.current.draw.options.drawBoxes = false;
      humanRef.current.draw.options.useCurves = false;
      humanRef.current.draw.options.drawGestures = false;
      // humanRef.current.draw.options.color = "#00FF00";
      humanRef?.current.draw.canvas(videoRef?.current, canvasRef.current);
      humanRef?.current.draw.all(canvasRef.current, interpolated);
    }
  };

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
      if (humanRef?.current) {
        const interpolated = await detect();

        if (controls.showDetection && interpolated) {
          draw(interpolated);
        }

        const now = humanRef?.current.now();

        if (typeof now === "number") {
          fpsRef.current = 1000 / (now - timestampRef.current);
          timestampRef.current = now;
        }

        animationFrameId = requestAnimationFrame(detectAndDraw);
      }
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
