"use client";

import React, { createContext, useContext, useState } from "react";

interface StepContextProps {
  currentStep: number;
  handleNextStep: () => void;
  handlePrevStep: () => void;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
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
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const handlePrevStep = () =>
    setCurrentStep((prevStep) => Math.max(1, prevStep - 1));

  return (
    <StepContext.Provider
      value={{ currentStep, handleNextStep, handlePrevStep, setCurrentStep }}
    >
      {children}
    </StepContext.Provider>
  );
};
