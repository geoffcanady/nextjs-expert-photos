import {
  StyledButtonInner,
  StyledButtonRing,
  StyledCameraButton,
} from "./index.styles";

interface CameraButtonProps {
  disabled?: boolean;
  onClick: () => void;
}

export default function CameraButton({ onClick, disabled }: CameraButtonProps) {
  return (
    <StyledCameraButton
      aria-label="Take your photo"
      disabled={disabled}
      onClick={() => onClick?.()}
    >
      <StyledButtonRing />
      <StyledButtonInner />
    </StyledCameraButton>
  );
}
