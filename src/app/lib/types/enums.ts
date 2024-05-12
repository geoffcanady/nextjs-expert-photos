/**
 * Instruction prompts for the different camera steps.
 */
export enum CameraStepsMessages {
  LoadingCamera = "Analyzing image...",
  CameraEnabled = "Take a photo!",
  PickPhoto = "Pick a photo you like!",
  TakePhotoTwo = "Let’s take two more",
  TakePhotoThree = "Let’s take one more",
}

/**
 * Instruction prompts for the different onboarding steps.
 */
export enum OnboardingStepsMessages {
  Step1 = "Find a plain white to use as a backdrop. The background will be removed later.",
  Step2 = "Make sure your face is lit, and avoid shadows. Natural light is the best option.",
  Step3 = "We recommend having someone take a photo for you. You may also take a selfie.",
  Step4 = "Have you found a good place to take a photo?",
}

/**
 * Realtime video feedback.
 */
export enum GestureFeedbackMessages {
  HeadTiltedUp = "Look forward",
  HeadTiltedDown = "Look forward",
  HeadTiltedLeft = "Look forward",
  HeadTiltedRight = "Look forward",
  HeadTurnedLeft = "Look forward",
  HeadTurnedRight = "Look forward",
  ShouldersInFrame = "Place your shoulders in the frame",
  TooFar = "Move closer to the camera",
  TooClose = "Move away from the camera",
  // Face outside of camera guide bounds
  OffCenter = "Center you face in the camera",
  //
  None = "Take a photo!",
}

/**
 * Error messages for the Camera component instatiation.
 */
export enum ErrorMessageKey {
  NoCameraAccessible = "noCameraAccessible",
  PermissionDenied = "permissionDenied",
  SwitchCamera = "switchCamera",
  CanvasNotSupported = "canvas",
}

export enum ErrorMessage {
  NoCameraAccessible = "No camera device accessible. Please connect your camera or try a different browser.",
  PermissionDenied = "Permission denied. Please refresh and give camera permission.",
  SwitchCamera = "It is not possible to switch camera to a different one because there is only one video device accessible.",
  CanvasNotSupported = "Canvas is not supported.",
}

/** Path for static images */
export enum AssetPrefixes {
  // SbsegExpertPhotos = "https://sbseg-designtechnology.intuit.com/prototypes/gcanady/expert-photos",
  SbsegExpertPhotos = "",
}
