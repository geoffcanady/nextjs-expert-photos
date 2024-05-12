import styled from "styled-components";
import { light } from "@design-tokens/intuit";

export const StyledLogoContainer = styled.div`
  align-items: center;
  background-color: #236cff;
  border-radius: ${light.radius.radiusCircle};
  display: inline-flex;
  height: ${light.size.size8};
  justify-content: center;
  width: ${light.size.size8};
`;
