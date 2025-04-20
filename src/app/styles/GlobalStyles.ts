"use client";

import styled, { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

const GlobalStyles = createGlobalStyle`
  ${normalize}

  :root {}

  @media (prefers-color-scheme: dark) {}

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html,
  body {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  body {
    border-radius: 60px;
    color: #21262A;
  }

  @media (prefers-color-scheme: dark) {
    html {
      color-scheme: dark;
    }
  }
`;

export const StyledAppContainer = styled.div`
  background-color: white;
  border-radius: 16px;
  box-shadow: 0px 0px 0px 0px rgba(36, 28, 21, 0),
    0px 0px 0px 1px rgba(36, 28, 21, 0.15);
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 16px;
  padding: 40px 16px;
  position: relative;
`;

export const StyledPanelContainer = styled.div``;

export const StyledPromptPanel = styled(StyledPanelContainer)``;

export const StyledActionsLeftCol = styled.div``;

export const StyledMobileActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-evenly;
  margin: auto auto 0;
  max-width: 400px;
  width: 100%;

  > * {
    width: calc(100% / 3);
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

export const StyledDesktopActions = styled.div`
  @media (max-width: 767px) {
    display: none;
  }

  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

export const StyledActionsContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  @media (max-width: 767px) {
    margin-top: auto;
  }
`;

export default GlobalStyles;
