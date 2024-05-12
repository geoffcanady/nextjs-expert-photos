import { light } from "@design-tokens/intuit";
import styled from "styled-components";

const cameraGuideSize = 140;

export const StyledGuideContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  z-index: 100;
`;

export const StyledGuideInner = styled.div`
  position: relative;
  height: ${cameraGuideSize}px;
  width: ${cameraGuideSize}px;
  top: -${light.size.size8};

  #camera-guide-top-left {
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
  }

  #camera-guide-top-right {
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
  }

  #camera-guide-bottom-right {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 30px;
  }

  #camera-guide-bottom-left {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 30px;
  }
`;
