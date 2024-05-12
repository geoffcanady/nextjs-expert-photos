import { CameraProvider } from "@/app/lib/context/camera-context";
import { HumanProvider } from "@/app/lib/context/human-context";
import CameraCanvas from "./canvas";

export default function CanvasPage() {
  return (
    <CameraProvider>
      <HumanProvider>
        <CameraCanvas />
      </HumanProvider>
    </CameraProvider>
  );
}
