import styled from "styled-components";
import { light } from "@design-tokens/intuit";

export const StyledStageContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: ${light.size.size4};
`;

export const StyledStageInner = styled.div`
  align-items: center;
  border-radius: ${light.radius.radiusMedium};
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
  width: 100%;
`;
