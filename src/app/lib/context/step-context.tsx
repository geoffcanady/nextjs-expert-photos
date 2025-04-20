"use client";

import React, { createContext, useContext, useState } from "react";

interface StepContextProps {
  currentStep: number | string;
  handleNextStep: () => void;
  handlePrevStep: () => void;
  setCurrentStep: React.Dispatch<React.SetStateAction<number | string>>;
}

interface StepProviderProps {
  children: React.ReactNode;
}

const initialContext: StepContextProps = {
  currentStep: 1,
  handleNextStep: () => {},
  handlePrevStep: () => {},
  setCurrentStep: () => {},
};

const StepContext = createContext<StepContextProps>(initialContext);

export const useSteps = (): StepContextProps => useContext(StepContext);

export const StepProvider: React.FC<StepProviderProps> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<number | string>(1);

  const handleNextStep = () => {
    if (typeof currentStep === "number") {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep("");
    }
  };

  const handlePrevStep = () => {
    if (typeof currentStep === "number") {
      setCurrentStep(Math.max(1, currentStep - 1));
    } else {
      setCurrentStep("");
    }
  };

  return (
    <StepContext.Provider
      value={{ currentStep, handleNextStep, handlePrevStep, setCurrentStep }}
    >
      {children}
    </StepContext.Provider>
  );
};
