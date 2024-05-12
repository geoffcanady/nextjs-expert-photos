"use client";

import styled, { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import { light } from "@design-tokens/intuit";

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
    /* background: linear-gradient(338deg, #D50BFF 2.27%, #C010FF 7.37%, #7426FF 27.29%, #43F 41.65%, #3239FF 48.6%); */
    /* background-color: #2E7CF6; */
    color: #fff;
  }

  @media (prefers-color-scheme: dark) {
    html {
      color-scheme: dark;
    }
  }
`;

export const StyledAppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100svh;
`;

export const GradBg = styled.div`
  background: linear-gradient(
    338deg,
    #d50bff 2.27%,
    #c010ff 7.37%,
    #7426ff 27.29%,
    #43f 41.65%,
    #3239ff 48.6%
  );
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const StyledAppMain = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const FullStage = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  padding: ${light.size.size4};
`;

export default GlobalStyles;
