import { SinglePhotoBg, SinglePhotoContainer } from "./index.styles";

export default function SinglePhoto({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SinglePhotoContainer>
      <SinglePhotoBg>{children}</SinglePhotoBg>
    </SinglePhotoContainer>
  );
}
