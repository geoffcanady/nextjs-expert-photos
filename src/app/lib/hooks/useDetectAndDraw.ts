import { RefObject, useEffect, useState, useRef } from "react";
import { Human as HumanType, Result } from "@vladmandic/human";
import { computeFps } from "@/app/lib/utils/timing";
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
  const timestampRef = useRef(Date.now());
  const [fps, setFps] = useState(0);
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
      humanRef.current.draw.options = {
        ...humanRef.current.draw.options,
        drawLabels: false,
        drawBoxes: false,
        useCurves: false,
        drawGestures: false,
      };
      humanRef.current.draw.canvas(videoRef.current, canvasRef.current);
      humanRef.current.draw.all(canvasRef.current, interpolated);
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

    const detectAndDrawLoop = async () => {
      if (humanRef?.current) {
        const interpolated = await detect();

        if (controls?.showDetection && interpolated) {
          draw(interpolated);
        }

        const now = humanRef.current.now();
        const newFps = computeFps(timestampRef.current, now);
        setFps(newFps);
        timestampRef.current = now;

        animationFrameId = requestAnimationFrame(detectAndDrawLoop);
      }
    };

    detectAndDrawLoop();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [humanRef, videoRef, canvasRef, humanIsReady, controls]);

  return { detectionResults, fps };
};

export default useDetectAndDraw;
