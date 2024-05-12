import { GradBg } from "@/app/styles/GlobalStyles";
import { StyledCameraDrawer, StyledDrawerTop } from "./index.styles";

export default function CameraDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyledCameraDrawer>
      <GradBg>
        <StyledDrawerTop />
        {children}
      </GradBg>
    </StyledCameraDrawer>
  );
}
