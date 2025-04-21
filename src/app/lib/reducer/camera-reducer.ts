import { Result } from "@vladmandic/human";
import { FacingMode } from "@/app/lib/types/types";

export type DetectionResult = Result | null;

export interface CameraState {
  currentFacingMode: FacingMode;
  detectionResults: DetectionResult;
  imgBgRemovedUrl: string;
  isBgRemoved: boolean;
  isVideoReady: boolean;
  photos: string[];
  showCountdown: boolean;
  showFlash: boolean;
  count: number;
  hatCheckResult: string;
}

export type CameraAction =
  | { type: "SET_FACING_MODE"; payload: FacingMode }
  | { type: "SET_DETECTION_RESULTS"; payload: DetectionResult }
  | { type: "SET_VIDEO_READY"; payload: boolean }
  | { type: "ADD_PHOTO"; payload: string }
  | { type: "SET_COUNT"; payload: number }
  | { type: "SET_SHOW_COUNTDOWN"; payload: boolean }
  | { type: "SET_SHOW_FLASH"; payload: boolean }
  | { type: "SET_BG_REMOVED"; payload: { url: string; isRemoved: boolean } }
  | { type: "RESET_BG" }
  | { type: "RESET_CAMERA" }
  | { type: "SET_HAT_CHECK_RESULT"; payload: string };

export const initialCameraState: CameraState = {
  currentFacingMode: "user",
  detectionResults: null,
  imgBgRemovedUrl: "",
  isBgRemoved: false,
  isVideoReady: false,
  photos: [],
  showCountdown: false,
  showFlash: false,
  count: 3,
  hatCheckResult: "",
};

export const cameraReducer = (
  state: CameraState,
  action: CameraAction
): CameraState => {
  switch (action.type) {
    case "SET_FACING_MODE":
      return { ...state, currentFacingMode: action.payload };
    case "SET_DETECTION_RESULTS":
      return { ...state, detectionResults: action.payload };
    case "SET_VIDEO_READY":
      return { ...state, isVideoReady: action.payload };
    case "ADD_PHOTO":
      return { ...state, photos: [...state.photos, action.payload] };
    case "SET_COUNT":
      return { ...state, count: action.payload };
    case "SET_SHOW_COUNTDOWN":
      return { ...state, showCountdown: action.payload };
    case "SET_SHOW_FLASH":
      return { ...state, showFlash: action.payload };
    case "SET_BG_REMOVED":
      return {
        ...state,
        imgBgRemovedUrl: action.payload.url,
        isBgRemoved: action.payload.isRemoved,
      };
    case "RESET_BG":
      return { ...state, imgBgRemovedUrl: "", isBgRemoved: false };
    case "RESET_CAMERA":
      return initialCameraState;
    case "SET_HAT_CHECK_RESULT":
      return { ...state, hatCheckResult: action.payload };
    default:
      return state;
  }
};
