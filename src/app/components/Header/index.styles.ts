import styled from "styled-components";
import { light } from "@design-tokens/intuit";
import { StyledLogoContainer } from "../LogoIEP/index.styles";
import { HeaderProps } from ".";

/** TODO: $fixed is flaky */
export const StyledHeader = styled.div<{ $fixed?: HeaderProps }>`
  align-items: center;
  display: flex;
  height: ${light.size.size14};
  justify-content: center;
  padding: 0 ${light.size.size4};
  /* position: ${({ $fixed }) => ($fixed ? "absolute" : "static")}; */
  top: 0;
  left: 0;

  ${StyledLogoContainer} {
    margin-right: ${light.size.size4};
  }
`;

export const StyledFixedHeader = styled(StyledHeader)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 400;
`;

export const StyledHeaderTitle = styled.h1`
  color: #fff;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding-left: ${light.size.size2};
`;
