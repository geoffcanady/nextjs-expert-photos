import { useEffect } from "react";
import { useControls } from "leva";
import { useGlobalContext } from "@/app/lib/context/global-context";

const GlobalControls = () => {
  const {
    cameraZoom,
    countdownOption,
    showOutput,

    setCameraZoom,
    setCountdownOption,
    setShowOutput,
  } = useGlobalContext();

  // const { countOption, output, zoom } = useControls({
  //   countOption: {
  //     value: countdownOption,
  //     options: [2, 5, 6],
  //     label: "Countdown Option",
  //   },
  //   zoom: {
  //     value: cameraZoom,
  //     min: 0.5,
  //     max: 10.0,
  //     step: 0.1,
  //     label: "Camera zoom",
  //   },
  // });

  // useEffect(() => {
  //   setCameraZoom(zoom);
  //   setCountdownOption(countOption as 2 | 5 | 6);
  // }, [
  //   countOption,
  //   zoom,
  //   setCameraZoom,
  //   setCountdownOption,
  // ]);

  return null;
};

export default GlobalControls;
