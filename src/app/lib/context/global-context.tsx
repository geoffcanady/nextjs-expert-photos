"use client";

import React, {
  createContext,
  useState,
  useMemo,
  ReactNode,
  useContext,
} from "react";

interface GlobalContextType {
  cameraZoom: number;
  countdownOption: 1 | 2 | 3 | 4 | 5 | 6;
  showOutput: boolean;
  setCameraZoom: React.Dispatch<React.SetStateAction<number>>;
  setCountdownOption: React.Dispatch<
    React.SetStateAction<1 | 2 | 3 | 4 | 5 | 6>
  >;
  setShowOutput: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [cameraZoom, setCameraZoom] = useState(1.0);
  const [countdownOption, setCountdownOption] = useState<1 | 2 | 3 | 4 | 5 | 6>(
    2
  );
  const [showOutput, setShowOutput] = useState(false);

  const value: GlobalContextType = useMemo(
    () => ({
      cameraZoom,
      countdownOption,
      showOutput,
      setCameraZoom,
      setCountdownOption,
      setShowOutput,
    }),
    [cameraZoom, countdownOption]
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
