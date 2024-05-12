import { SinglePhotoBg, SinglePhotoContainer } from "./index.styles";

export function SinglePhoto({ children }: { children: React.ReactNode }) {
  return (
    <SinglePhotoContainer>
      <SinglePhotoBg>{children}</SinglePhotoBg>
    </SinglePhotoContainer>
  );
}

export default SinglePhoto;
