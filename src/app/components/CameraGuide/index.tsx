import { useEffect, useState } from "react";
import { AssetPrefixes, GestureFeedbackMessages } from "@/app/lib/types/enums";
import StaticImg from "../StaticImg";

export default function CameraGuide({
  gestureFeedbackMsg,
}: {
  gestureFeedbackMsg: string;
}) {
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    if (gestureFeedbackMsg === GestureFeedbackMessages.None) {
      setImgUrl("mask-overlay-pass.png");
    } else {
      setImgUrl("mask-overlay-fail.png");
    }
  }, [gestureFeedbackMsg]);

  return (
    <StaticImg
      src={`${AssetPrefixes.SbsegExpertPhotos}/${imgUrl}`}
      alt="Find a plain white to use as a backdrop."
      width={1000}
      height={1000}
      $responsive
      style={{ position: "absolute", top: 0, right: 0, bottom: 0, zIndex: 300 }}
    />
  );
}
