import styled from "styled-components";
import { AspectRatio } from "@/app/lib/types/types";
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

export const StyledCanvasContainer = styled.div<{ $aspectratio: AspectRatio }>`
  ${({ $aspectratio }) =>
    $aspectratio === "cover"
      ? `
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    `
      : `
      align-self: center;
      position: relative;
      width: 320px;
      z-index: 200;

      @media(min-width: 768px) {
        width: 400px;
      } 
    `}
`;

export const StyledVideo = styled.video<{
  $mirrored: boolean;
  $aspectratio: AspectRatio;
}>`
  aspect-ratio: ${({ $aspectratio }) =>
    $aspectratio === "cover" ? `16 / 9` : `1 / 1`};
  background-color: black;
  border-radius: ${({ $aspectratio }) =>
    $aspectratio === "cover" ? `0` : `8px`};
  object-fit: cover;
  position: relative;
  transform: rotateY(${({ $mirrored }) => ($mirrored ? "180deg" : "0deg")});
  z-index: 0;
  width: 100%;
  height: auto;

  @media (min-width: 768px) {
    border-radius: ${({ $aspectratio }) =>
      $aspectratio === "cover" ? `0` : `16px`};
  }
`;

export const StyledCanvas = styled.canvas<{
  $showCanvas: ControlProps["showDetection"];
}>`
  display: ${(props) => (props.$showCanvas ? "block" : "none")};
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
