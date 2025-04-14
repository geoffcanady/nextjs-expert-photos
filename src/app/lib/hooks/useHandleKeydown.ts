import { useEffect, RefObject } from "react";
import { CameraType } from "@/app/lib/types/types";
import { useCameraContext } from "@/app/lib/context/camera-context";

const useHandleKeyDown = ({
  camera,
  disabled,
}: {
  camera: RefObject<CameraType>;
  disabled: boolean;
}) => {
  const { isVideoReady, handleTakePhoto } = useCameraContext();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space" && isVideoReady && !disabled) {
        event.preventDefault();
        handleTakePhoto(camera);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVideoReady, disabled, handleTakePhoto, camera]);
};

export default useHandleKeyDown;
