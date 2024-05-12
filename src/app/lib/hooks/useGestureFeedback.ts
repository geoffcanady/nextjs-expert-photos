import { useState, useEffect } from "react";
import { Result } from "@vladmandic/human";
import { GestureFeedbackMessages } from "@/app/lib/types/enums";

export const useGestureFeedback = (detectionResults: Result | null) => {
  const [gestureFeedbackMsg, setGestureFeedbackMsg] =
    useState<GestureFeedbackMessages>(GestureFeedbackMessages.None);

  /**
   * Destructure results
   */
  const results = detectionResults;
  const face = results?.face[0];
  const box = face?.box;
  const boxSize = face?.size;

  /**
   * Head rotation.
   * Pitch - chin up/down.
   * Roll - head tilted towards shoulder.
   * Yaw - chin left / right.
   */
  const pitch = parseFloat(face?.rotation?.angle?.pitch.toFixed(2) || "0");
  const roll = parseFloat(face?.rotation?.angle?.roll.toFixed(2) || "0");
  const yaw = parseFloat(face?.rotation?.angle?.yaw.toFixed(2) || "0");

  /**
   * Pose.
   */
  const leftShoulder = parseFloat(
    results?.body[0]?.keypoints[5]?.score.toFixed(2) || "0"
  );
  const rightShoulder = parseFloat(
    results?.body[0]?.keypoints[6]?.score.toFixed(2) || "0"
  );

  const getMessageType = (): GestureFeedbackMessages => {
    // if (leftShoulder < 0.5 || rightShoulder < 0.5) return GestureFeedbackMessages.ShouldersInFrame;
    /**
     * Distance from camera.
     */
    if (boxSize && boxSize?.[0] < 550) return GestureFeedbackMessages.TooFar;
    if (boxSize && boxSize?.[0] > 850) return GestureFeedbackMessages.TooClose;

    /**
     * Head centering. Values decrease left side of screen to right.
     */
    // Horizontal centering
    if (box && box?.[0] > 700) return GestureFeedbackMessages.OffCenter;
    if (box && box?.[0] < 400) return GestureFeedbackMessages.OffCenter;
    // Vertical centering
    if (box && box?.[1] > 400) return GestureFeedbackMessages.OffCenter;
    if (box && box?.[1] < 120) return GestureFeedbackMessages.OffCenter;

    /**
     * Chin up/down
     */
    if (pitch < -0.3) return GestureFeedbackMessages.HeadTiltedUp;
    if (pitch > 0.3) return GestureFeedbackMessages.HeadTiltedDown;

    /**
     * Head tilted towards shoulders
     */
    if (roll < -0.5) return GestureFeedbackMessages.HeadTiltedRight;
    if (roll > 0.5) return GestureFeedbackMessages.HeadTiltedLeft;

    /**
     * Chin left / right
     */
    if (yaw < -0.5) return GestureFeedbackMessages.HeadTurnedLeft;
    if (yaw > 0.5) return GestureFeedbackMessages.HeadTurnedRight;
    return GestureFeedbackMessages.None;
  };

  useEffect(() => {
    const messageType = getMessageType();
    setGestureFeedbackMsg(messageType);
  }, [detectionResults]);

  return { gestureFeedbackMsg };
};

export default useGestureFeedback;
