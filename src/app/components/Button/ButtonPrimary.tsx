"use client";

import React from "react";
import { StyledButtonPrimary } from "./Button.styles";

export interface ButtonProps {
  $block?: string;
  disabled?: boolean;
  icon?: JSX.Element;
  label?: string;
  onClick: () => void;
}

export default function ButtonPrimary({
  $block,
  disabled,
  icon,
  label,
  onClick,
}: ButtonProps) {
  return (
    <StyledButtonPrimary
      onClick={() => onClick()}
      $block={$block}
      disabled={disabled}
    >
      {icon}
      {label}
    </StyledButtonPrimary>
  );
}
