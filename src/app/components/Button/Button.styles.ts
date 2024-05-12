import styled from "styled-components";
import { light } from "@design-tokens/intuit";
import { ButtonProps } from "./ButtonPrimary";

export const StyledButton = styled.button<ButtonProps>`
  all: unset;
  align-items: center;
  border-radius: ${light.radius.radiusMedium};
  border-style: solid;
  border-width: 1px;
  cursor: pointer;
  display: ${({ $block }) => ($block ? "flex" : "inline-flex")};
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  height: ${light.size.size12};
  justify-content: center;
  line-height: 28px;
  opacity: ${({ disabled }) => (disabled ? "0.2" : 1)};
  padding: 0 ${light.size.size2};
  transition: opacity 300ms;
  width: ${({ $block }) => ($block ? "100%" : "auto")};
`;

export const StyledButtonPrimary = styled(StyledButton)`
  background-color: white;
  border-color: white;
  color: #236cff;
`;

export const StyledButtonOutline = styled(StyledButton)`
  background-color: transparent;
  border-color: white;
  color: white;
`;
