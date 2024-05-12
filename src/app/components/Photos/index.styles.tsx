import styled from "styled-components";
import { light } from "@design-tokens/intuit";

// remove
export const StyledPhotoSelectContainer = styled.div`
  margin: ${light.size.size8};
  position: relative;
`;

export const StyledPhotoContainer = styled.div`
  margin: ${light.size.size8};
  position: relative;
`;

export const SinglePhotoContainer = styled.div`
  border-radius: ${light.radius.radiusLarge};
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(0deg, #21262a 0%, #2b3135 95.56%);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25) inset;
  padding: ${light.size.size2};
  width: 100%;
`;

export const SinglePhotoBg = styled.div`
  background-color: #fff;
  border-radius: ${light.radius.radiusSmall};
  display: flex;
  overflow: hidden;
  position: relative;
  width: 100%;
`;
