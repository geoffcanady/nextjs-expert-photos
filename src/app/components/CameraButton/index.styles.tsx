import styled from "styled-components";

export const StyledCameraButton = styled.button`
  align-items: center;
  all: unset;
  display: flex;
  height: 50px;
  justify-content: center;
  position: relative;
  width: 50px;
  padding: 10px;

  &:disabled {
    opacity: 0.6;
  }
`;

export const StyledButtonRing = styled.div`
  border-radius: 50%;
  box-shadow: 0 0 0 8px rgb(255 255 255 / 0.6);
  position: absolute;
  top: 50%;
  left: 50%;
  height: 56px;
  transform: translate(-50%, -50%);
  width: 56px;
`;

export const StyledButtonInner = styled.div`
  border-radius: 50%;
  background-color: white;
  flex: 1;
  width: 100%;
`;
