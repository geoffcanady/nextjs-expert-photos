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
    color: #fff;
  }

  @media (prefers-color-scheme: dark) {
    html {
      color-scheme: dark;
    }
  }
`;

export const StyledAppContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  min-height: 100svh;
  position: relative;
`;

export const StyledMainCol = styled.main`
  display: flex;
  flex-direction: column;
  width: clamp(320px, 100%, 600px);
  height: 100vh;
`;

export const StyledCol = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
`;

export const StyledTopCol = styled.div`
  margin-top: auto;
  padding-bottom: 72px;
  text-align: center;
  z-index: 200;
`;

export const StyledBottomCol = styled(StyledCol)`
  padding-bottom: 64px;
`;

export const StyledActionsContent = styled.div`
  border-radius: 16px;
  border: 1px solid #e2e9ed;
  background: #fff;
  display: flex;
  flex-direction: column;
  height: 352px;
  /* justify-content: center; */
  gap: 24px;
  padding: 12px 12px 32px;
  position: relative;
  z-index: 100;
`;

export const StyledActionsContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: auto;
  gap: 16px;
  padding: 0 48px;
`;

export const StyledRadialBlur = styled.div`
  background-color: #7cbcff;
  bottom: -80vh;
  filter: blur(150px);
  height: 600px;
  position: fixed;
  width: 1200px;
`;

export default GlobalStyles;
