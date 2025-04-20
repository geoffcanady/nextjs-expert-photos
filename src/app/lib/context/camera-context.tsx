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

  const handleTakePhoto = (camera: RefObject<CameraType>) => {
    cameraRefInContext.current = camera;
    dispatch({ type: "SET_SHOW_COUNTDOWN", payload: true });
    dispatch({ type: "SET_COUNT", payload: 3 });
  };

  /**
   * 3-2-1 countdown effect. We don't display 0.
   */
  useEffect(() => {
    if (!state.showCountdown || state.count <= 0) return;

    countdownRef.current = setTimeout(() => {
      dispatch({ type: "SET_COUNT", payload: state.count - 1 });
    }, 1000);

    return () => {
      if (countdownRef.current) {
        clearTimeout(countdownRef.current);
      }
    };
  }, [state.count, state.showCountdown]);

  /**
   * Handle taking a photo when countdown reaches zero
   */
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

    const delay = setTimeout(() => {
      if (gestureFeedbackMsg !== GestureFeedbackMessages.Success) {
        setCurrentStep("photo-error");
      } else {
        handleNextStep();
      }

      dispatch({ type: "SET_SHOW_COUNTDOWN", payload: false });
      dispatch({ type: "SET_SHOW_FLASH", payload: false });

      if (state.isVideoReady) {
        dispatch({ type: "SET_VIDEO_READY", payload: false });
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [state.count, gestureFeedbackMsg]);

  const handleBgRemoval = async () => {
    if (state.photos.length === 0) return;
    const imageBlob = await removeBackground(state.photos[0]);
    const url = URL.createObjectURL(imageBlob);
    dispatch({ type: "SET_BG_REMOVED", payload: { url, isRemoved: true } });
  };

  const handleBgReset = () => {
    dispatch({ type: "RESET_BG" });
  };

  const setCurrentFacingMode = (value: React.SetStateAction<FacingMode>) => {
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
    setCurrentFacingMode,
    setDetectionResults,
    setIsVideoReady,
    setPhotos,
    setShowCountdown,
    setShowFlash,
    resetCamera,
  };

  return (
    <CameraContext.Provider value={value}>{children}</CameraContext.Provider>
  );
};
