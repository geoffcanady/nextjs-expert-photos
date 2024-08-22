"use client";

import React, {
  createContext,
  ReactNode,
  RefObject,
  useContext,
  useState,
} from "react";

import { Result } from "@vladmandic/human";
import { removeBackground } from "@imgly/background-removal";
import { CameraType, FacingMode } from "@/app/lib/types/types";
import useFadeInOut from "@/app/lib/hooks/useFadeInOut";

type DetectionResult = Result | null;

interface CameraContextType {
  currentStep: number;
  currentFacingMode: FacingMode;
  detectionResults: DetectionResult | null;
  imgBgRemovedUrl: string | undefined;
  isBgRemoved: boolean;
  isVideoReady: boolean;
  photos: string[];
  showFade: boolean;
  handleBgRemoval: () => Promise<void>;
  handleBgReset: () => void;
  handleNextStep: () => void;
  handlePrevStep: () => void;
  handleTakePhoto: (camera: RefObject<CameraType>) => void;
  setCurrentFacingMode: React.Dispatch<React.SetStateAction<FacingMode>>;
  setDetectionResults: React.Dispatch<
    React.SetStateAction<DetectionResult | null>
  >;
  setIsVideoReady: (value: React.SetStateAction<boolean>) => void;
  setPhotos: React.Dispatch<React.SetStateAction<string[]>>;
}

const CameraContext = createContext<CameraContextType | undefined>(undefined);

export const useCameraContext = (): CameraContextType => {
  const context = useContext(CameraContext);
  if (context === undefined) {
    throw new Error("useCameraContext must be used within a CameraProvider");
  }
  return context;
};

interface CameraProviderProps {
  children: ReactNode;
}

export const CameraProvider: React.FC<CameraProviderProps> = ({ children }) => {
  const [currentFacingMode, setCurrentFacingMode] =
    useState<FacingMode>("user");
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [detectionResults, setDetectionResults] =
    useState<DetectionResult | null>(null);
  const [imgBgRemovedUrl, setImgBgRemovedUrl] = useState<string>("");
  const [isBgRemoved, setIsBgRemoved] = useState<boolean>(false);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const { showFade, triggerFade } = useFadeInOut(300);

  const handleNextStep = () => setCurrentStep((prevStep) => prevStep + 1);

  const handlePrevStep = () =>
    setCurrentStep((prevStep) => Math.max(1, prevStep - 1));

  const handleTakePhoto = (camera: RefObject<CameraType>) => {
    const photo = camera.current?.takePhoto();
    if (photo !== undefined) {
      setPhotos((prevPhotos) => [...prevPhotos, photo]);
      triggerFade();
    }
  };

  const handleBgRemoval = async () => {
    const imageBlob = await removeBackground(photos[0]);
    const url = URL.createObjectURL(imageBlob);
    setImgBgRemovedUrl(url);
    setIsBgRemoved(true);
  };

  const handleBgReset = () => {
    setImgBgRemovedUrl("");
    setIsBgRemoved(false);
  };

  return (
    <CameraContext.Provider
      value={{
        currentFacingMode,
        currentStep,
        detectionResults,
        imgBgRemovedUrl,
        isBgRemoved,
        isVideoReady,
        photos,
        showFade,
        handleBgRemoval,
        handleBgReset,
        handleNextStep,
        handlePrevStep,
        handleTakePhoto,
        setCurrentFacingMode,
        setDetectionResults,
        setIsVideoReady,
        setPhotos,
      }}
    >
      {children}
    </CameraContext.Provider>
  );
};
