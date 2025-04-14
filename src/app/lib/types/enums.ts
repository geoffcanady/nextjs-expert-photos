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
 * Realtime video feedback. Listed in order of feedback priority.
 */
export enum GestureFeedbackMessages {
  // Head / no head present.
  NoFace = "No face detected",
  // Proximity
  TooFar = "Move closer",
  TooClose = "Move further away ",
  // Hands
  Hands = "Keep your hands down",
  // Centered vertically / horizontally w/in the camera guide
  OffCenter = "Center your face",
  // Chin turned left/right
  HeadTurnedLeft = "Look straight ahead",
  HeadTurnedRight = "Look straight ahead",
  // Chin tilted up/down
  HeadTiltedUp = "Lower your chin",
  HeadTiltedDown = "Raise your chin",
  // Head tilted towards shoulders
  HeadTiltedLeft = "Look straight ahead",
  HeadTiltedRight = "Look straight ahead",
  // No position errors
  Success = "Looks good, take photo",
  // Dormant
  Empty = "",
}

export type GestureFeedbackMessagesType = GestureFeedbackMessages | undefined;

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
  // SbsegExpertPhotos = "https://sbseg-designtechnology.intuit.com/prototypes/gcanady/expert-photos/test-desktop",
  // SbsegExpertPhotos = "https://sbseg-designtechnology.intuit.com/prototypes/gcanady/
  SbsegExpertPhotos = "",
}
