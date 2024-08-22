"use client";

import React from "react";
import { ButtonProps } from "./ButtonPrimary";
import { StyledButtonSecondary } from "./Button.styles";

export default function ButtonSecondary({
  $block,
  disabled,
  icon,
  label,
  onClick,
}: ButtonProps) {
  return (
    <StyledButtonSecondary
      onClick={() => onClick()}
      $block={$block}
      disabled={disabled}
    >
      {icon}
      {label}
    </StyledButtonSecondary>
  );
}
