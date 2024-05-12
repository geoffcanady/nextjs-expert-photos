import { StyledStageInner, StyledStageContainer } from "./index.styles";

export default function StyledStage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyledStageContainer>
      <StyledStageInner>{children}</StyledStageInner>
    </StyledStageContainer>
  );
}
