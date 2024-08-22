import { Config } from "@vladmandic/human";

export const humanConfig: Partial<Config> = {
  debug: false,
  // backend: "wasm",
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
  hand: { enabled: true },
  object: { enabled: false },
  gesture: { enabled: false },
  segmentation: { enabled: false },
};
