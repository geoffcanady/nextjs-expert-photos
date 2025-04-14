import IconCameraSwitch from "@/app/components/Icons/IconCameraSwitch";
import { StyledCameraSwitchButton } from "./index.styles";

interface CameraSwitchButtonProps {
  onClick: () => void;
}

export default function CameraSwitchButton({
  onClick,
}: CameraSwitchButtonProps) {
  return (
    <StyledCameraSwitchButton
      aria-label="Switch camera"
      onClick={() => onClick?.()}
    >
      <IconCameraSwitch />
    </StyledCameraSwitchButton>
  );
}
