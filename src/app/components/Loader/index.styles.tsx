import styled from "styled-components";
import { light } from "@design-tokens/intuit";

export const StyledLoadingContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
`;

export const StyledCameraLoader = styled(StyledLoadingContainer)`
  background-color: black;
`;

export const StyledOverlayLoader = styled(StyledLoadingContainer)`
  z-index: 200;
`;
