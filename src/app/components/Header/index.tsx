import { AssetPrefixes } from "@/app/lib/types/enums";
import StaticImg from "@/app/components/StaticImg";
import {
  StyledFixedHeader,
  StyledHeader,
  StyledHeaderTitle,
} from "./index.styles";

export interface HeaderProps {
  $fixed?: boolean;
}

/** TODO: $fixed is flaky so there's a temp <FixedHeader> component */
export default function Header({ $fixed = false }: HeaderProps) {
  return (
    <StyledHeader $fixed={{ $fixed }}>
      <StaticImg
        src={`${AssetPrefixes.SbsegExpertPhotos}/logo-camera.png`}
        alt="Welcome to the Expert Photo Booth."
        width={20}
        height={20}
      />
      <StyledHeaderTitle>Expert Photo Booth</StyledHeaderTitle>
    </StyledHeader>
  );
}

export function FixedHeader() {
  return (
    <StyledFixedHeader>
      <StaticImg
        src={`${AssetPrefixes.SbsegExpertPhotos}/logo-camera.png`}
        alt="Welcome to the Expert Photo Booth."
        width={20}
        height={20}
      />
      <StyledHeaderTitle>Expert Photo Booth</StyledHeaderTitle>
    </StyledFixedHeader>
  );
}
