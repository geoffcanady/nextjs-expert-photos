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
  padding-top: 12px;
  position: relative;
`;

export const StyledMainCol = styled.main`
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100 - 92px);
  padding: 0 16px 16px;
  width: 100%;

  @media (min-width: 768px) {
  }
`;

export const StyledMainColHome = styled(StyledMainCol)`
  /* width: 600px; */
`;

export const StyledCol = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  /* flex: 1; */
  position: relative;
`;

export const StyledTopCol = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  padding-top: 40px;
`;

export const StyledLogoCol = styled(StyledTopCol)`
  flex: 1;
  justify-content: center;
  margin-bottom: 0;
`;

export const StyledBottomCol = styled(StyledCol)`
  flex: 1;
  justify-content: space-between;
  padding-bottom: 16px;

  @media (min-width: 768px) {
    flex: 0;
    justify-content: flex-start;
    padding-bottom: 0;
  }
`;

export const StyledPanelContainer = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 12px 12px 32px;
  position: relative;
  z-index: 100;
`;

export const StyledPromptPanel = styled(StyledPanelContainer)``;

export const StyledMobileActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-evenly;
  margin-top: auto;
  width: 100%;

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
  margin-top: auto;
`;

export default GlobalStyles;
