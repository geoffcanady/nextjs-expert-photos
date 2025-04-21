"use client";

import React, {
  createContext,
  ReactNode,
  RefObject,
  useContext,
  useReducer,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { removeBackground } from "@imgly/background-removal";
import { useSteps } from "@/app/lib/context/step-context";
import { CameraType, FacingMode } from "@/app/lib/types/types";
import useGestureFeedback from "../hooks/useGestureFeedback";
import { GestureFeedbackMessages } from "../types/enums";
import {
  CameraState,
  initialCameraState,
  cameraReducer,
  DetectionResult,
} from "@/app/lib/reducer/camera-reducer";

export interface CameraContextType extends CameraState {
  handleBgRemoval: () => Promise<void>;
  handleBgReset: () => void;
  handleTakePhoto: (camera: RefObject<CameraType>) => void;
  handleHatCheck: () => Promise<void>;
  setCurrentFacingMode: React.Dispatch<React.SetStateAction<FacingMode>>;
  setDetectionResults: React.Dispatch<React.SetStateAction<DetectionResult>>;
  setIsVideoReady: React.Dispatch<React.SetStateAction<boolean>>;
  setPhotos: React.Dispatch<React.SetStateAction<string[]>>;
  setShowCountdown: React.Dispatch<React.SetStateAction<boolean>>;
  setShowFlash: React.Dispatch<React.SetStateAction<boolean>>;
  resetCamera: () => void;
}

const CameraContext = createContext<CameraContextType | undefined>(undefined);

export const useCameraContext = (): CameraContextType => {
  const context = useContext(CameraContext);
  if (!context) {
    throw new Error("useCameraContext must be used within a CameraProvider");
  }
  return context;
};

interface CameraProviderProps {
  children: ReactNode;
}

export const CameraProvider: React.FC<CameraProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cameraReducer, initialCameraState);
  const cameraRefInContext = useRef<RefObject<CameraType> | null>(null);
  const { gestureFeedbackMsg } = useGestureFeedback(state.detectionResults);
  const { handleNextStep, setCurrentStep } = useSteps();
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  // Kick off 3‑2‑1, then take a photo
  const handleTakePhoto = (camera: RefObject<CameraType>) => {
    cameraRefInContext.current = camera;
    dispatch({ type: "SET_SHOW_COUNTDOWN", payload: true });
    dispatch({ type: "SET_COUNT", payload: 3 });
  };

  useEffect(() => {
    if (!state.showCountdown || state.count <= 0) return;
    countdownRef.current = setTimeout(() => {
      dispatch({ type: "SET_COUNT", payload: state.count - 1 });
    }, 1000);
    return () => {
      if (countdownRef.current) clearTimeout(countdownRef.current);
    };
  }, [state.count, state.showCountdown]);

  useEffect(() => {
    if (state.count !== 0) return;
    const camera = cameraRefInContext.current;
    if (camera?.current) {
      const photo = camera.current.takePhoto();
      if (photo) {
        dispatch({ type: "ADD_PHOTO", payload: photo });
        dispatch({ type: "SET_SHOW_FLASH", payload: true });
      }
    }
    const t = setTimeout(() => {
      if (gestureFeedbackMsg !== GestureFeedbackMessages.Success) {
        setCurrentStep("photo-error");
      } else {
        handleNextStep();
      }
    }, 300);
    return () => clearTimeout(t);
  }, [state.count, gestureFeedbackMsg, handleNextStep, setCurrentStep]);

  const handleBgRemoval = async () => {
    if (state.photos.length === 0) return;
    const imageBlob = await removeBackground(state.photos[0]);
    const url = URL.createObjectURL(imageBlob);
    dispatch({ type: "SET_BG_REMOVED", payload: { url, isRemoved: true } });
  };

  const handleBgReset = () => {
    dispatch({ type: "RESET_BG" });
  };

  const handleHatCheck = async () => {
    console.log('handleHatCheck');

    if (state.photos.length === 0) return;
    const base64 = state.photos[0].split(",")[1];
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      });

      const { result } = await res.json();

      console.log('result: ', result)

      dispatch({ type: "SET_HAT_CHECK_RESULT", payload: result });

      if (result.trim().toUpperCase().startsWith("PASS")) {
        // handleBgRemoval();
        // handleNextStep();
      } else {
        // setCurrentStep("hat-fail");
      }
    } catch (err) {
      console.error(err);

      dispatch({
        type: "SET_HAT_CHECK_RESULT",
        payload: "FAIL: Unable to reach API",
      });

      setCurrentStep("hat-fail");
    }
  };

  const setCurrentFacingMode = (
    value: React.SetStateAction<FacingMode>
  ) => {
    dispatch({
      type: "SET_FACING_MODE",
      payload:
        typeof value === "function"
          ? (value as Function)(state.currentFacingMode)
          : value,
    });
  };
  const setDetectionResults = useCallback(
    (value: React.SetStateAction<DetectionResult>) => {
      dispatch({
        type: "SET_DETECTION_RESULTS",
        payload:
          typeof value === "function"
            ? (value as (prev: DetectionResult) => DetectionResult)(
              state.detectionResults
            )
            : value,
      });
    },
    [state.detectionResults]
  );
  const setIsVideoReady = (value: React.SetStateAction<boolean>) => {
    dispatch({
      type: "SET_VIDEO_READY",
      payload:
        typeof value === "function"
          ? (value as Function)(state.isVideoReady)
          : value,
    });
  };
  const setPhotos = (value: React.SetStateAction<string[]>) => {
    dispatch({ type: "RESET_BG" });
  };
  const setShowCountdown = (value: React.SetStateAction<boolean>) => {
    dispatch({
      type: "SET_SHOW_COUNTDOWN",
      payload:
        typeof value === "function"
          ? (value as Function)(state.showCountdown)
          : value,
    });
  };
  const setShowFlash = (value: React.SetStateAction<boolean>) => {
    dispatch({
      type: "SET_SHOW_FLASH",
      payload:
        typeof value === "function"
          ? (value as Function)(state.showFlash)
          : value,
    });
  };
  const resetCamera = () => {
    dispatch({ type: "RESET_CAMERA" });
  };

  const value: CameraContextType = {
    ...state,
    handleBgRemoval,
    handleBgReset,
    handleTakePhoto,
    handleHatCheck,
    setCurrentFacingMode,
    setDetectionResults,
    setIsVideoReady,
    setPhotos,
    setShowCountdown,
    setShowFlash,
    resetCamera,
  };

  return (
    <CameraContext.Provider value={value}>
      {children}
    </CameraContext.Provider>
  );
};
