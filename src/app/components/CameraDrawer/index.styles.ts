import { light } from "@design-tokens/intuit";
import styled from "styled-components";

export const StyledCameraDrawer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const StyledDrawerTop = styled.div`
  background-color: #3239ff;
  border-top-right-radius: ${light.radius.radiusXLarge};
  border-top-left-radius: ${light.radius.radiusXLarge};
  height: 21px;
  position: relative;
  transform: translate3d(0, -20px, 0);
  z-index: 500;
`;
