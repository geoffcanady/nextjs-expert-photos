import { Config } from "@vladmandic/human";

const isMobileDevice = (): boolean => {
  if (typeof window === "undefined") return false;
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
};

export const humanConfig: Partial<Config> = {
  debug: false,
  modelBasePath: "https://cdn.jsdelivr.net/npm/@vladmandic/human/models",
  filter: { enabled: true, equalization: false, flip: false },
  face: {
    attention: { enabled: false },
    antispoof: { enabled: false },
    detector: { rotation: true },
    description: { enabled: false },
    emotion: { enabled: false },
    enabled: true,
    iris: { enabled: false },
    liveness: { enabled: false },
    mesh: { enabled: true },
  },
  body: { enabled: false },
  hand: { enabled: !isMobileDevice() },
  object: { enabled: false },
  gesture: { enabled: false },
  segmentation: { enabled: false },
};
