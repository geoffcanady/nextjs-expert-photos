import { light } from "@design-tokens/intuit";
import { AssetPrefixes } from "@/app/lib/types/enums";
import Rotation from "@/app/components/Rotation";
import StaticImg from "@/app/components/StaticImg";
import { StyledOverlayLoader } from "./index.styles";

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
      <StaticImg
        src={`${AssetPrefixes.SbsegExpertPhotos}/mask-overlay-blue.png`}
        alt="Select the image or re-take your photo."
        style={{
          borderRadius: light.radius.radiusCircle,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          height: "auto",
          objectFit: "cover",
          width: "100%",
          zIndex: 100,
        }}
        width={1000}
        height={1000}
      />
    </StyledOverlayLoader>
  );
}

export default OverlayLoader;
