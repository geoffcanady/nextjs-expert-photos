import styled from "styled-components";

export const StyledCameraButton = styled.button`
  align-items: center;
  all: unset;
  display: flex;
  height: 100px;
  justify-content: center;
  position: relative;
  width: 100px;

  &:disabled {
    opacity: 0.5;
  }
`;

export const StyledButtonRing = styled.div`
  border-radius: 50%;
  box-shadow: 0 0 0 8px rgba(224, 237, 255, 1);
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  height: 82px;
  width: 82px;
`;

export const StyledButtonInner = styled.div`
  border-radius: 50%;
  border: solid 2px #fff;
  background-color: #2b77cc;
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  height: 80px;
  width: 80px;
`;
