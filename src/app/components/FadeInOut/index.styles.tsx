import styled, { keyframes } from "styled-components";

const animFadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 100;
  }
  100% {
    opacity: 0;
  }
`;

export const StyledFadeBox = styled.div<{ $duration: number }>`
  animation-name: ${animFadeInOut};
  animation-duration: ${(props) => props.$duration}ms;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;

  background-color: #fff;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 200;
`;
