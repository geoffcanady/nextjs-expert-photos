import { light } from "@design-tokens/intuit";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const StyledRotation = styled.div`
  animation: ${rotate} 2s linear infinite;
  height: 120px;
  position: relative;
  width: 120px;
  z-index: 100;
`;
