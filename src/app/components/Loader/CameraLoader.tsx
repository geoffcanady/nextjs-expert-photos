import { AssetPrefixes } from "@/app/lib/types/enums";
import Rotation from "@/app/components/Rotation";
import StaticImg from "@/app/components/StaticImg";
import { StyledCameraLoader } from "./index.styles";

export default function CameraLoader() {
  return (
    <StyledCameraLoader>
      <Rotation>
        <StaticImg
          alt="Camera is loading"
          src={`${AssetPrefixes.SbsegExpertPhotos}/loader-camera.png`}
          width={120}
          height={120}
        />
      </Rotation>
    </StyledCameraLoader>
  );
}
