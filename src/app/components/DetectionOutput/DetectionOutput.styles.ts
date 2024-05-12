import styled from "styled-components";

interface MicroProps {
  $micro: boolean | undefined;
}

export const StyledOutputContainer = styled.div<MicroProps>`
  background: rgba(0, 0, 0, 0.6);
  border-radius: 8px;
  color: white;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  z-index: 200;

  ${({ $micro }) =>
    $micro
      ? `
    position: relative;
    padding: 4px 8px 8px;
    `
      : `
      position: absolute;
      top: 40px;
      left: 40px;
      padding: 8px 16px 16px;
    
    `}
`;

export const StyledSectionTitle = styled.h5<MicroProps>`
  padding-top: ${({ $micro }) => ($micro ? "8px" : "16px")};
`;

export const StyledOutputValue = styled.p<MicroProps>`
  font-size: ${({ $micro }) => ($micro ? "16px" : "24px")};
`;
