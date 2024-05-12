import styled from "styled-components";
import { light } from "@design-tokens/intuit";

export const StyledActionsContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  gap: ${light.size.size4};
  margin-top: auto;
  padding: ${light.size.size4};
`;
