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
  $state: string;
}>`
  align-items: center;
  display: flex;
  height: 32px;
  justify-content: center;
  left: 50%;
  position: absolute;
  transform: translate3d(-50%, -50%, 0);
  width: 100%;
  z-index: 2000;

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

  @media (min-width: 768px) {
    height: 50px;
  }
`;

export const StyledCameraBanner = styled.div<{
  $disabled?: boolean;
}>`
  border: solid 3px #fff;
  border-radius: 9999px;
  background-color: ${({ $disabled }) => ($disabled ? "#e2e9ed" : "#7FFA94")};
  font-size: 20px;
  font-weight: 500;
  height: 32px;
  line-height: 30px;
  padding: 0 24px;
  //
  align-items: center;
  display: flex;
  justify-content: center;
  gap: 8px;
  //
  position: relative;
  text-align: center;
  transition: background-color 250ms ease-in-out;
  width: 300px;
  z-index: 2000;

  svg {
    position: relative;
    transform: translate3d(0, 0, 0);
    height: 24px;
    width: 24px;

    @media (min-width: 768px) {
      height: 32px;
      width: 32px;
    }
  }

  @media (min-width: 768px) {
    font-size: 22px;
    font-weight: 500;
    line-height: 47.82px;
    height: 50px;
    width: 320px;
  }
`;
