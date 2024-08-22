import styled from "styled-components";

export const StyledPromptContainer = styled.div`
  padding: 16px;
`;

export const StyledPrompt = styled.div<{ $alignment: string }>`
  align-items: center;
  color: #2b3135;
  display: flex;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  justify-content: center;
  line-height: 30px;
  min-height: 62px;
  padding-top: 88px;
  text-align: ${({ $alignment }) =>
    $alignment === "left" ? "left" : "center"};
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
