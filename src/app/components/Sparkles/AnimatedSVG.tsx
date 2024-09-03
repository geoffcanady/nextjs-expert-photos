import React from "react";
import styled, { keyframes, css } from "styled-components";

const animScaleUpIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const animScaleUp = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
`;

interface AnimatedSVGProps {
  children: React.ReactNode;
  $delay: number;
  $hover?: string;
  style?: React.CSSProperties;
}

const animatedStyle = (delay: number) => css`
  animation: ${animScaleUpIn} 1.2s forwards;
  animation-delay: ${delay}s;
`;

const hoverScale = (delay: number) => css`
  animation: ${animScaleUp} 1.2s forwards;
  animation-delay: ${delay}s;
`;

const StyledAnimatedSVG = styled.div<{ $delay: number; $hover?: string }>`
  display: inline-block;
  opacity: 0;
  ${({ $delay }) => animatedStyle($delay)}
`;

export const AnimatedSVG = ({
  children,
  style,
  $delay,
  $hover,
}: AnimatedSVGProps) => {
  return (
    <StyledAnimatedSVG
      $delay={$delay}
      style={style}
      $hover={$hover?.toString()}
    >
      {children}
    </StyledAnimatedSVG>
  );
};

export default AnimatedSVG;
