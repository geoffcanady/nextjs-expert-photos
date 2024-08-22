import React, { useState, useEffect } from "react";
import { AnimatedSVG } from "@/app/components/Sparkles/AnimatedSVG";
import { SPARKLES } from "./sparkles";
import styled, { keyframes } from "styled-components";

const floatAnimation = keyframes`
  0% {
    transform: translate(0);
  }
  50% {
    transform: translate(0, 5px);
  }
  100% {
    transform: translate(0);
  }
`;

const StyledSparklesContainer = styled.div`
  animation: ${floatAnimation} 3s ease-in-out infinite;
  display: flex;
  position: absolute;
  bottom: 70px;
  height: 90px;
  width: 100%;
  /* background-color: grey; */
  z-index: 100;

  &:hover {
    /* background-color: aqua; */
  }
`;

export default function Sparkles() {
  const [hover, setHover] = useState<string>("false");

  useEffect(() => {
    console.log("hover: ", hover);
  }, [hover]);

  return (
    <StyledSparklesContainer
      onMouseEnter={() => setHover("true")}
      onMouseLeave={() => setHover("false")}
    >
      {SPARKLES.map((item, index) => (
        <AnimatedSVG
          key={index}
          $delay={index * 0.06}
          $hover={hover}
          style={item.style as React.CSSProperties}
        >
          {item.svg}
        </AnimatedSVG>
      ))}
    </StyledSparklesContainer>
  );
}
