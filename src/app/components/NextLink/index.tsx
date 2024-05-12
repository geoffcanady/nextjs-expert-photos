"use client";

import React from "react";
import { StyledLink } from "./index.styles";

export interface LinkProps {
  block?: string;
  children?: React.ReactNode;
  label?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "tertiary";
}

export default function Link({
  block,
  children,
  label,
  onClick,
  variant,
}: LinkProps) {
  return (
    <StyledLink onClick={() => onClick} variant={variant} block={block}>
      {label && label}
      {children}
    </StyledLink>
  );
}
