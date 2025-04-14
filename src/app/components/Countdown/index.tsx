import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface CountProps {
  onCountdownEnd: () => void;
}

const StyledCountdownContainer = styled.span`
  align-items: center;
  display: flex;
  justify-content: center;
  
`;

const StyledCount = styled.span<{ fontSize?: number }>`
  font-size: ${(props) => props.fontSize + "px" || "20px"};
  text-align: center;

  @media (min-width: 768px) {
    font-size: ${(props) => props.fontSize + "px" || "24"};
  }
`;

const Countdown = ({ onCountdownEnd }: CountProps) => {
  const [count, setCount] = useState<number>(3);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => Math.max(prevCount - 1, 0));
    }, 1000);

    if (count === 0) {
      onCountdownEnd?.();
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [count]);

  return (
    <StyledCountdownContainer>
      <StyledCount>{count > 0 && count}</StyledCount>
    </StyledCountdownContainer>
  );
};

export default Countdown;
