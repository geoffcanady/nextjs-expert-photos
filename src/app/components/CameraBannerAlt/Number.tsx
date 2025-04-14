import styled, { keyframes } from "styled-components";
import React, { useEffect, useState } from "react";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const NumberWrapper = styled.span`
  font-size: 24px;
  font-weight: bold;
  opacity: 0;
  animation: ${fadeIn} 300ms ease-in-out forwards;
`;

export function Number({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  return <NumberWrapper key={value}>{displayValue}</NumberWrapper>;
}
