import { AssetPrefixes } from "@/app/lib/types/enums";
import Rotation from "@/app/components/Rotation";
import StaticImg from "@/app/components/StaticImg";
import { StyledOverlayLoader, StyledOverlayMask } from "./index.styles";

export function OverlayLoader() {
  return (
    <StyledOverlayLoader>
      <Rotation>
        <StaticImg
          alt="Removing background"
          src={`${AssetPrefixes.SbsegExpertPhotos}/loader-camera.png`}
          width={120}
          height={120}
          style={{
            position: "relative",
            zIndex: 0,
          }}
        />
      </Rotation>
      <StyledOverlayMask />
    </StyledOverlayLoader>
  );
}

export default OverlayLoader;
