"use client";

import React from "react";
import { ButtonProps } from "./ButtonPrimary";
import { StyledButtonOutline } from "./Button.styles";

export default function ButtonOutline({
  $block,
  disabled,
  icon,
  label,
  onClick,
}: ButtonProps) {
  return (
    <StyledButtonOutline
      onClick={() => onClick()}
      $block={$block}
      disabled={disabled}
    >
      {icon}
      {label}
    </StyledButtonOutline>
  );
}
