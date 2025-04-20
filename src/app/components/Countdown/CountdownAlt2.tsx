import React, { useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import { Transition } from "react-transition-group";

interface CountdownProps {
  count: number;
  show: boolean;
}

interface NumberProps {
  $active: boolean;
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const Container = styled.div<{ $state: string }>`
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 8px 8px 0 0;
  height: 80px;
  padding-top: 16px;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1000;

  ${({ $state }) =>
    $state === "entering" &&
    css`
      animation: ${fadeIn} 200ms ease-in-out forwards;
    `}

  ${({ $state }) =>
    $state === "exiting" &&
    css`
      animation: ${fadeOut} 200ms ease-in-out forwards;
    `}

  @media screen and (prefers-reduced-motion: reduce) {
    animation: none;
    transition: none;
  }
`;

const NumbersContainer = styled.div`
  align-items: center;
  display: flex;
  height: 64px;
  justify-content: center;
  gap: 24px;
`;

const Number = styled.span<NumberProps>`
  color: white;
  font-size: 48px;
  font-weight: bold;
  opacity: ${(props) => (props.$active ? 1 : 0.4)};
  transition: opacity 300ms ease;
`;

export function CountdownAlt2({ count, show }: CountdownProps) {
  const nodeRef = useRef(null);
  const numbers = [3, 2, 1];

  return (
    <Transition
      in={show}
      timeout={200}
      mountOnEnter
      unmountOnExit
      nodeRef={nodeRef}
    >
      {(state) => (
        <>
          {count !== 0 && (
            <Container ref={nodeRef} $state={state}>
              <NumbersContainer>
                {numbers.map((number) => (
                  <Number key={number} $active={count === number}>
                    {number}
                  </Number>
                ))}
              </NumbersContainer>
            </Container>
          )}
        </>
      )}
    </Transition>
  );
}
