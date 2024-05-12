import styled from "styled-components";
import { light } from "@design-tokens/intuit";

import { LinkProps } from ".";

export const StyledLink = styled.a<LinkProps>`
  all: unset;
  align-items: center;
  border-radius: ${light.radius.radiusMedium};
  border: 1px solid rgba(255, 255, 255, 0.1);
  /* Elevation/Level 1 */
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
  color: ${light.color.colorTextInverse};
  cursor: pointer;
  display: ${({ block }) => (block ? "flex" : "inline-flex")};
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  height: ${light.size.size12};
  justify-content: center;
  line-height: 28px;
  padding: 0 ${light.size.size2};
  text-decoration: none;
  width: ${({ block }) => (block ? "100%" : "auto")};

  background-color: ${({ variant }) => {
    switch (variant) {
      case "primary":
        return "#236cff";
      case "secondary":
        return "#4C555B";
      case "tertiary":
        return "#EDA700";
      default:
        return "#236cff";
    }
  }};

  &:hover,
  &:visited {
    text-decoration: none;
  }
`;
