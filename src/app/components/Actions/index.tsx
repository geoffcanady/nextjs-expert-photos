import { StyledActionsContainer } from "./index.styles";

export default function Actions({ children }: { children: React.ReactNode }) {
  return <StyledActionsContainer>{children}</StyledActionsContainer>;
}
