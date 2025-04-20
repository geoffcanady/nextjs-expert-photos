import styled from "styled-components";

export const StyledPromptContainer = styled.div`
  margin-bottom: 16px;
  padding: 0 16px;
`;

export const StyledPrompt = styled.div<{ $alignment: string }>`
  align-items: center;
  color: #2b3135;
  display: flex;
  flex-direction: column;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  justify-content: center;
  line-height: 30px;
  min-height: 30px;
  text-align: ${({ $alignment }) =>
    $alignment === "left" ? "left" : "center"};

  span {
    font-size: 18px;
  }
`;
