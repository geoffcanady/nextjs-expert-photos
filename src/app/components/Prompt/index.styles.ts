import styled from "styled-components";
import { light } from "@design-tokens/intuit";

export const StyledPromptContainer = styled.div`
  padding: ${light.size.size4};
`;

export const StyledPrompt = styled.div<{ $alignment: string }>`
  align-items: center;
  /* background-color: #2b3135; */
  /* border-radius: ${light.radius.radiusLarge}; */
  color: #fff;
  display: flex;
  font-size: 19px;
  font-weight: 500;
  justify-content: center;
  line-height: 28px;
  /** for empty prompts */
  min-height: 62px;
  /* padding: ${light.size.size4} 0; */
  text-align: ${({ $alignment }) =>
    $alignment === "left" ? "left" : "center"};

  ol {
    padding-inline-start: ${light.size.size8};
  }

  li {
    margin-bottom: ${light.size.size2};
  }
`;

export const StyledLoadingPrompt = styled.div`
  color: white;
  font-size: 19px;
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  width: 100%;
  z-index: 200;
`;
