
"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { Human as HumanType } from "@vladmandic/human";
import { humanConfig } from "@/app/lib/config/humanConfig";

export interface ResultsProps {
  showResults: boolean;
  faceGesture: boolean;
  rotation: boolean;
  body: boolean;
  shoulders: boolean;
  objects: boolean;
}
export interface ControlProps {
  showDetection?: boolean;
  Results?: ResultsProps;
}

interface HumanContextType {
  controls?: ControlProps;
  humanIsReady: boolean;
  humanRef: React.RefObject<HumanType> | null;
}

export const HumanContext = createContext<HumanContextType | undefined>(
  undefined
);

export const useHumanContext = (): HumanContextType => {
  const context = useContext(HumanContext);
  if (context === undefined) {
    throw new Error("useHumanContext must be used within a HumanProvider");
  }
  return context;
};

interface HumanProviderProps {
  children: ReactNode;
}

export const HumanProvider: React.FC<HumanProviderProps> = ({ children }) => {
  const [humanIsReady, setHumanIsReady] = useState(false);
  const humanRef = useRef<HumanType | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadHumanLibrary = async () => {
      if (typeof window !== "undefined") {
        const { default: Human } = (await import(
          "@vladmandic/human"
        )) as unknown as {
          default: typeof HumanType;
        };
        const humanLib = new Human(humanConfig);

        // console.time("loadHumanModel");

        if (isMounted) {
          humanRef.current = humanLib;
          await humanLib.load();

          // await humanLib.load().then(() => {
          //   console.timeEnd("loadHumanModel");
          // });

          await humanLib.warmup();
          setHumanIsReady(true);
        }
      }
    };

    loadHumanLibrary();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <HumanContext.Provider value={{ humanIsReady, humanRef }}>
      {children}
    </HumanContext.Provider>
  );
};
