// import React from "react";
import React from "react";
import { StyledFadeBox } from "./index.styles";

export default function FadeInOut({ duration }: { duration: number }) {
  return <StyledFadeBox $duration={duration} />;
}
