import styled, { keyframes, css } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

export const StyledBannerContainer = styled.div<{
  fontSize: number;
  $feedbackOption?: 1 | 2 | 3;
  $state: string;
  $showCountdown?: boolean;
}>`
  height: ${(props) =>
    props.$showCountdown ? "80px" : `${props.fontSize * (32 / 20)}px`};
  width: ${(props) => (props.$showCountdown ? "80px" : "310px")};
  left: 50%;
  position: absolute;
  transform: translate3d(-50%, -50%, 0);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $state }) =>
    $state === "entering" &&
    css`
      animation: ${fadeIn} 100ms ease-in-out forwards;
    `}

  ${({ $state }) =>
    $state === "exiting" &&
    css`
      animation: ${fadeOut} 100ms ease-in-out forwards;
    `}

    transition: width 300ms ease-in-out, height 300ms ease-in-out;

  @media screen and (prefers-reduced-motion: reduce) {
    animation: none;
    transition: none;
  }

  @media (min-width: 768px) {
    height: ${(props) =>
      props.$showCountdown ? "80px" : `${props.fontSize * (50 / 24)}px`};
  }
`;

export const StyledCameraBanner = styled.div<{
  $disabled: boolean;
  fontSize: number;
  $feedbackOption: 1 | 2 | 3;
  $showCountdown?: boolean;
}>`
  border: solid 3px #fff;
  border-radius: 9999px;
  background-color: ${({ $disabled }) => ($disabled ? "#e2e9ed" : "#7FFA94")};
  height: ${(props) =>
    props.$showCountdown ? "80px" : `${props.fontSize * (32 / 20)}px`};
  width: ${(props) => (props.$showCountdown ? "80px" : "auto")};
  min-width: ${(props) => (props.$showCountdown ? "80px" : "320px")};
  padding: 0 24px;
  align-items: center;
  display: flex;
  justify-content: center;
  gap: 8px;
  text-align: center;
  transition: background-color 300ms ease-in-out, width 300ms ease-in-out,
    height 300ms ease-in-out;
  font-size: ${(props) =>
    props.$showCountdown ? "34px" : props.fontSize + "px" || "20px"};
  font-weight: 500;
  line-height: ${(props) =>
    props.fontSize ? `${props.fontSize * (30 / 20)}px` : "30px"};
  position: relative;
  z-index: 1000;
  width: ${(props) => (props.$showCountdown ? "80px" : "310px")};

  @media (min-width: 768px) {
    font-size: ${(props) =>
      props.$showCountdown ? "34px" : props.fontSize + "px" || "24"};
    height: ${(props) =>
      props.$showCountdown ? "80px" : `${props.fontSize * (50 / 24)}px`};
  }
`;
