import { StyledPrompt, StyledPromptContainer } from "./index.styles";

interface PromptProps {
  $alignment?: "left" | "center" | "right";
  children: React.ReactNode;
}

export default function Prompt({
  children,
  $alignment = "center",
}: PromptProps) {
  return (
    <StyledPromptContainer>
      <StyledPrompt $alignment={$alignment}>{children}</StyledPrompt>
    </StyledPromptContainer>
  );
}
