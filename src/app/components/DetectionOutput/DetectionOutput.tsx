// @ts-nocheck

import { Result, ObjectResult } from "@vladmandic/human";
import {
  StyledOutputContainer,
  StyledSectionTitle,
  StyledOutputValue,
} from "./DetectionOutput.styles";
import { useHumanContext } from "@/app/lib/context/human-context";

export interface DetectionOutputProps {
  detectionResults: Result | null;
  $micro?: boolean;
}

export default function DetectionOutput({
  detectionResults,
  $micro,
}: DetectionOutputProps) {
  /**
   * Log results
   */
  // console.log("results: ", detectionResults);
  const { controls } = useHumanContext();
  const results = detectionResults;

  /**
   * Face
   */
  const face = results?.face[0];
  // console.log("face: ", face);
  const angle = face?.rotation?.angle;
  const pitch = angle?.pitch.toFixed(2);
  const roll = angle?.roll.toFixed(2);
  const yaw = angle?.yaw.toFixed(2);

  /**
   * Body / pose
   */
  const body = results?.body[0];
  const leftShoulder = body?.keypoints[5]?.score?.toFixed(2);
  const rightShoulder = body?.keypoints[6]?.score?.toFixed(2);

  return (
    <StyledOutputContainer $micro={$micro}>
      {/* <StyledSectionTitle $micro={$micro}>Face</StyledSectionTitle> */}
      {/* <StyledOutputValue
        $micro={$micro}
      >{`Gesture: ${results?.gesture[0]?.gesture}`}</StyledOutputValue> */}
      {/* <StyledOutputValue
        $micro={$micro}
      >{`Confidence: ${face?.score}`}</StyledOutputValue> */}
      {/* <StyledOutputValue
        $micro={$micro}
      >{`Iris gesture: ${results?.gesture[2]?.gesture}`}</StyledOutputValue> */}

      <StyledSectionTitle $micro={$micro}>Face position</StyledSectionTitle>
      <StyledOutputValue $micro={$micro}>
        Box:{" "}
        {face?.box.map((item, index) => {
          if (index === face?.box.length) {
            return <span key={index}>{item}</span>;
          }

          return <span key={index}>{item}, </span>;
        })}
      </StyledOutputValue>
      <StyledOutputValue $micro={$micro}>
        Box raw:{" "}
        {face?.boxRaw.map((item, index) => {
          if (index === face?.box.length) {
            return <span key={index}>{item.toFixed(2)}</span>;
          }

          return <span key={index}>{item.toFixed(2)}, </span>;
        })}
      </StyledOutputValue>

      <StyledOutputValue $micro={$micro}>
        Box size:{" "}
        {face?.size.map((item, index) => {
          if (index === face?.box.length) {
            return <span key={index}>{item}</span>;
          }

          return <span key={index}>{item}, </span>;
        })}
      </StyledOutputValue>

      <>
        <StyledSectionTitle $micro={$micro}>Rotation</StyledSectionTitle>
        <StyledOutputValue $micro={$micro}>{`Yaw: chin left/right: ${
          yaw ? yaw : ""
        }`}</StyledOutputValue>
        <StyledOutputValue $micro={$micro}>{`Roll: tilt left/right: ${
          roll ? roll : ""
        }`}</StyledOutputValue>
        <StyledOutputValue $micro={$micro}>{`Pitch: chin up/down: ${
          pitch ? pitch : ""
        }`}</StyledOutputValue>
      </>

      {controls?.body && (
        <StyledSectionTitle $micro={$micro}>Pose</StyledSectionTitle>
      )}

      {controls?.body && controls?.shoulders && (
        <>
          <StyledOutputValue $micro={$micro}>{`Left shoulder: ${
            leftShoulder ? leftShoulder : ""
          }`}</StyledOutputValue>
          <StyledOutputValue $micro={$micro}>{`Right shoulder: ${
            rightShoulder ? rightShoulder : ""
          }`}</StyledOutputValue>
        </>
      )}

      {/* <StyledOutputValue $micro={$micro}>{`Object: ${results?.object[0].label}`}</StyledOutputValue> */}
      {/* <StyledOutputValue $micro={$micro}>{`Face gesture: ${results?.emotion[0]?.gesture}`}</StyledOutputValue> */}

      {controls?.objects && results?.object?.length && (
        <div>
          <StyledSectionTitle $micro={$micro}>Objects</StyledSectionTitle>
          {results?.object?.map((obj: ObjectResult, index: number) => (
            <StyledOutputValue $micro={$micro} key={index}>
              {obj?.label} (confidence: {obj.score})
              {index !== results?.object?.length && ", "}
            </StyledOutputValue>
          ))}
        </div>
      )}
    </StyledOutputContainer>
  );
}
