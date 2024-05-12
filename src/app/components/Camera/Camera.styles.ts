import styled from "styled-components";
import { AspectRatio } from "@/app/lib/types/types";
import { ControlProps } from "@/app/lib/context/human-context";

export const StyledErrorMessage = styled.div`
  padding: 40px;
`;

export const StyledCanvasContainer = styled.div<{ $aspectratio: AspectRatio }>`
  width: 100%;

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
    position: relative;
    `}
`;

export const StyledVideo = styled.video<{
  $mirrored: boolean;
  $aspectratio: AspectRatio;
}>`
  aspect-ratio: 1/1;
  height: 100%;
  object-fit: cover;
  position: relative;
  transform: rotateY(${({ $mirrored }) => ($mirrored ? "180deg" : "0deg")});
  width: 100%;
  z-index: 0;
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
  height: 100%;
  object-fit: cover;
  z-index: 100;
  transform: rotateY(180deg);
`;
