import styled from "styled-components";
import { ControlProps } from "@/app/lib/context/human-context";

export const StyledErrorMessage = styled.div`
  border: solid 1px #d4d7dc;
  padding: 16px;
  font-size: 12px;
  border-radius: 8px;
  position: absolute;
  top: -30px;
  z-index: 1000;
  background: white;
  width: 300px;
  left: 10px;

  @media (min-width: 768px) {
    left: 50px;
  }
`;

export const StyledVideoContainer = styled.div`
  position: relative;
`;

export const StyledCanvasContainer = styled.div`
  align-self: center;
  position: relative;
  margin: 0 0 24px;
  width: 320px;
  z-index: 200;

  @media (min-width: 768px) {
    width: 400px;
  }
`;

export const StyledVideo = styled.video`
  aspect-ratio: 1 / 1;
  background-color: black;
  border-radius: 8px;
  height: auto;
  object-fit: cover;
  position: relative;
  transform: rotateY(180deg);
  width: 100%;
  z-index: 0;

  @media (min-width: 768px) {
    border-radius: 16px;
  }
`;

export const StyledCanvas = styled.canvas`
  display: none;
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;

  width: 100%;
  height: auto;
  object-fit: cover;
  z-index: 100;
  transform: rotateY(180deg);
`;
