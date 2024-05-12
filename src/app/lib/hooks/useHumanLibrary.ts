/**
 * Moved to HumanContext
 */
import { useState, useEffect, useRef } from "react";
import { Human as HumanType } from "@vladmandic/human";
import { humanConfig } from "@/app/lib/config/humanConfig";

export const useHumanLibrary = () => {
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

        if (isMounted) {
          humanRef.current = humanLib;
          await humanLib.load();
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

  return { humanIsReady, humanRef };
};
