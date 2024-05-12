import styled, { css } from "styled-components";
import { StaticImgProps } from ".";

export const StyledStaticImg = styled.img<StaticImgProps>`
  ${({ $responsive }) =>
    $responsive &&
    css`
      height: auto;
      object-fit: cover;
      width: 100%;
    `};
`;
