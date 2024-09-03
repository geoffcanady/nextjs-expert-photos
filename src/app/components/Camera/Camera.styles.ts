import styled from "styled-components";
import { AspectRatio } from "@/app/lib/types/types";
import { ControlProps } from "@/app/lib/context/human-context";

export const StyledErrorMessage = styled.div`
  padding: 40px;
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
      position: absolute;
      bottom: -100px;
      width: clamp(320px, 100%, 400px); 
      z-index: 200;
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
    $aspectratio === "cover" ? `0` : `100%`};
  object-fit: cover;
  position: relative;
  transform: rotateY(${({ $mirrored }) => ($mirrored ? "180deg" : "0deg")});
  z-index: 0;
  width: 100%;
  height: auto;
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
