import { PhotoBg, StyledPhotoContainer } from "./index.styles";

export default function Photo({ children }: { children: React.ReactNode }) {
  return (
    <StyledPhotoContainer>
      <PhotoBg>{children}</PhotoBg>
    </StyledPhotoContainer>
  );
}
