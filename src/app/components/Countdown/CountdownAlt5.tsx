import React, { useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import { Transition } from "react-transition-group";
import { useGlobalContext } from "@/app/lib/context/global-context";

interface CountdownProps {
  count: number;
  show: boolean;
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const numFadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const numberBounce = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.1);
  }
  70% {
    opacity: 0.95;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const Container = styled.div<{ $state: string }>`
  align-items: center;
  display: flex;
  height: 300px;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  opacity: 0.8;
  transform: translate3d(-50%, -50%, 0);
  width: 300px;
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

const Number = styled.div`
  animation: ${() => css`
    ${numberBounce} 500ms cubic-bezier(0.16, 1, 0.3, 1)
  `};
  font-size: 200px;
  font-weight: bold;
  color: transparent;
  -webkit-text-stroke: 4px white;
`;

export function CountdownAlt5({ count, show }: CountdownProps) {
  const nodeRef = useRef(null);
  const numberNodeRef = useRef(null);

  return (
    <Transition
      in={show}
      timeout={200}
      mountOnEnter
      unmountOnExit
      nodeRef={nodeRef}
    >
      {(state) => (
        <Container ref={nodeRef} $state={state}>
          <Number key={count} ref={numberNodeRef}>
            {count !== 0 && count}
          </Number>
        </Container>
      )}
    </Transition>
  );
}
