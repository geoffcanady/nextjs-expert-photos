// import React from "react";
import React from "react";
import { StyledCameraFlash } from "./index.styles";

export default function CameraFlash({ duration }: { duration: number }) {
  return <StyledCameraFlash $duration={duration} />;
}
