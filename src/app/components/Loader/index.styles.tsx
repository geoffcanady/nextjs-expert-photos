import styled from "styled-components";

export const StyledLoadingContainer = styled.div`
  align-items: center;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  position: absolute;
  left: 0;
  height: 320px;
  width: 320px;

  @media (min-width: 768px) {
    height: 400px;
    width: 400px;
  }
`;

export const StyledCameraLoader = styled(StyledLoadingContainer)`
  background-color: black;
`;

export const StyledOverlayLoader = styled(StyledLoadingContainer)<{
  $feedbackOption?: 1 | 2 | 3;
}>`
  top: 32px;
  z-index: 200;

  @media (min-width: 768px) {
    top: 42px;
  }
`;

export const StyledOverlayMask = styled.div`
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: auto;
  object-fit: cover;
  width: 100%;
  z-index: 100;
`;
