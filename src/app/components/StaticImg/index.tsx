/**
 * When exporting as a static site the next/image component requires some workarounds.
 * This is a temp fix.
 */
import { CSSProperties } from "react";
import { StyledStaticImg } from "./index.styles";

export interface StaticImgProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  $responsive?: boolean;
  style?: CSSProperties;
}

export default function StaticImg({
  src,
  alt,
  width,
  height,
  $responsive,
  style,
}: StaticImgProps) {
  return (
    <StyledStaticImg
      src={src}
      alt={alt}
      width={width}
      height={height}
      $responsive={$responsive}
      style={style}
    />
  );
}
