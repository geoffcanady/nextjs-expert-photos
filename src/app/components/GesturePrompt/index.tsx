import { StyledGesturePrompt } from "./index.styles";

interface PromptProps {
  children: React.ReactNode;
}

export default function GesturePrompt({ children }: PromptProps) {
  return <StyledGesturePrompt>{children}</StyledGesturePrompt>;
}
