import styled from "styled-components";
import { ButtonProps } from "./ButtonPrimary";

export const StyledButton = styled.button<ButtonProps>`
  ${({ $block }) =>
    $block
      ? ``
      : `
      align-self: center;
    `}
  align-items: center;
  border-radius: 6px;
  border-style: solid;
  border-width: 1px;
  cursor: pointer;
  display: ${({ $block }) => ($block ? "flex" : "inline-flex")};
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  height: 48px;
  justify-content: center;
  line-height: 28px;
  opacity: ${({ disabled }) => (disabled ? "0.2" : 1)};
  padding: 0 20px;
  transition: opacity 300ms;
  width: ${({ $block }) => ($block ? "100%" : "auto")};

  svg {
    margin-right: 8px;
  }
`;

export const StyledButtonPrimary = styled(StyledButton)`
  background-color: #2b77cc;
  border-color: #2b77cc;
  color: white;
`;

export const StyledButtonSecondary = styled(StyledButton)`
  background-color: white;
  border-color: white;
  color: #2b77cc;
`;
