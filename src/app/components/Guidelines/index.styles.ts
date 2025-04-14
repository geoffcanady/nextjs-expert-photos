import styled from "styled-components";

export const StyledGuidlinesContainer = styled.div`
  align-items: center;
  border-radius: 8px;
  background: #f4f9ff;
  color: #2b3135;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  padding: 40px 48px;
  text-align: center;

  h4 {
    font-size: 20px;
    font-weight: 600;
    line-height: 30px;
  }

  p,
  ol {
    font-size: 16px;
    font-weight: 400;
    line-height: 30px;
  }

  ol {
    padding-left: 24px;
  }
`;
