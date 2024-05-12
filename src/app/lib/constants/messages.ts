import {
  CameraStepsMessages,
  ErrorMessageKey,
  ErrorMessage,
  GestureFeedbackMessages,
  OnboardingStepsMessages,
} from "@/app/lib/types/enums";

export const messages = {
  cameraSteps: CameraStepsMessages,
  gestures: GestureFeedbackMessages,
  onboardingSteps: OnboardingStepsMessages,
  errors: {
    [ErrorMessageKey.NoCameraAccessible]: ErrorMessage.NoCameraAccessible,
    [ErrorMessageKey.PermissionDenied]: ErrorMessage.PermissionDenied,
    [ErrorMessageKey.SwitchCamera]: ErrorMessage.SwitchCamera,
    [ErrorMessageKey.CanvasNotSupported]: ErrorMessage.CanvasNotSupported,
  },
};
