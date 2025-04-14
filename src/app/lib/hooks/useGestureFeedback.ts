import { useState, useEffect, useRef } from "react";
import { Result } from "@vladmandic/human";
import { lerp } from "@/app/lib/utils/lerp";
import {
  GestureFeedbackMessages,
  GestureFeedbackMessagesType,
} from "@/app/lib/types/enums";
import {
  MAX_HEAD_SIZE,
  MIN_HEAD_SIZE,
  MIN_HEAD_XPOS_MIN_SIZE,
  MAX_HEAD_XPOS_MIN_SIZE,
  MIN_HEAD_YPOS_MIN_SIZE,
  MAX_HEAD_YPOS_MIN_SIZE,
  MIN_HEAD_XPOS_MAX_SIZE,
  MAX_HEAD_XPOS_MAX_SIZE,
  MIN_HEAD_YPOS_MAX_SIZE,
  MAX_HEAD_YPOS_MAX_SIZE,
  MIN_CHIN_XPOS,
  MAX_CHIN_XPOS,
  MIN_CHIN_YPOS,
  MAX_CHIN_YPOS,
} from "@/app/lib/constants/gesture-coords";

export const useGestureFeedback = (detectionResults: Result | null) => {
  const [gestureFeedbackMsg, setGestureFeedbackMsg] = useState(
    GestureFeedbackMessages.Empty
  );
  const successStartTimeRef = useRef<number | null>(null);
  const noFaceStartTimeRef = useRef<number | null>(null);

  /**
   * Dynamic positional thresholds.
   * These will be updated based on the current boxSize using linear interpolation.
   */
  const [minHeadXPos, setMinHeadXPos] = useState(MIN_HEAD_XPOS_MIN_SIZE);
  const [maxHeadXPos, setMaxHeadXPos] = useState(MAX_HEAD_XPOS_MIN_SIZE);

  /**
   * Destructure results.
   */
  const results = detectionResults;
  const face = results?.face[0];
  // Raw bounding box for the detected face.
  const box = face?.boxRaw;
  const boxSize = face?.size;

  /**
   * Head rotation angles.
   * Convert them to fixed decimal for consistency.
   */
  const pitch = parseFloat(face?.rotation?.angle?.pitch.toFixed(2) || "0");
  const roll = parseFloat(face?.rotation?.angle?.roll.toFixed(2) || "0");
  const yaw = parseFloat(face?.rotation?.angle?.yaw.toFixed(2) || "0");

  /**
   * The gesture feedback/guidance only displays one message at a time using the following prioritization:
   * 1. No head/face present.
   * 2. Hands present.
   * 3. Distance / proximity.
   * 4. Centered vertically / horizontally within the camera guide.
   * 5. Chin turned left/right.
   * 6. Chin tilted up/down.
   * 7. Head tilted towards shoulders.
   */

  useEffect(() => {
    /**
     * Dynamically update the head positioning thresholds based on the current boxSize.
     * When the boxSize is at MIN_HEAD_SIZE, the thresholds match the "atMin" values.
     * When at MAX_HEAD_SIZE, the thresholds match the "atMax" values.
     * For sizes in between, we interpolate linearly.
     */
    if (!boxSize || !boxSize[0]) return;
    const currentSize = boxSize[0];

    // Clamp currentSize to the min/max range to avoid extrapolation outside of bounds.
    const clampedSize = Math.max(
      Math.min(currentSize, MAX_HEAD_SIZE),
      MIN_HEAD_SIZE
    );

    // Calculate progress/interpolation factor.
    const progress =
      (clampedSize - MIN_HEAD_SIZE) / (MAX_HEAD_SIZE - MIN_HEAD_SIZE);

    setMinHeadXPos(
      lerp(MIN_HEAD_XPOS_MIN_SIZE, MIN_HEAD_XPOS_MAX_SIZE, progress)
    );
    setMaxHeadXPos(
      lerp(MAX_HEAD_XPOS_MIN_SIZE, MAX_HEAD_XPOS_MAX_SIZE, progress)
    );
  }, [boxSize, MIN_HEAD_SIZE, MAX_HEAD_SIZE]);

  const getFeedbackMessage = (): GestureFeedbackMessagesType | undefined => {
    /**
     * No face detected.
     * Wait for at least 3 seconds before returning NoFace.
     */
    if (!boxSize || !face) {
      if (noFaceStartTimeRef.current === null) {
        noFaceStartTimeRef.current = Date.now();
      }
      if (Date.now() - noFaceStartTimeRef.current >= 3000) {
        return GestureFeedbackMessages.NoFace;
      } else {
        return undefined;
      }
    } else {
      // Reset the no-face timer if a face is detected.
      noFaceStartTimeRef.current = null;
    }

    /**
     * Hands present.
     */
    if (results?.hand[0]?.score) return GestureFeedbackMessages.Hands;

    /**
     * Distance from camera.
     */
    if (boxSize && boxSize[0] < MIN_HEAD_SIZE)
      return GestureFeedbackMessages.TooFar;
    if (boxSize && boxSize[0] > MAX_HEAD_SIZE)
      return GestureFeedbackMessages.TooClose;

    /**
     * Head centering.
     * Values and checks are dynamically updated based on boxSize via interpolation.
     */
    if (boxSize && boxSize[0] >= MIN_HEAD_SIZE && boxSize[0] <= MAX_HEAD_SIZE) {
      // Horizontal centering:
      // Left side.
      if (box && box[0] > minHeadXPos) return GestureFeedbackMessages.OffCenter;
      // Right side.
      if (box && box[0] < maxHeadXPos) return GestureFeedbackMessages.OffCenter;

      // Vertical centering:
      // Top / Forehead.
      if (box && box[1] < 0.15) return GestureFeedbackMessages.OffCenter;
      // Bottom / chin.
      if (box && box[1] > 0.3) return GestureFeedbackMessages.OffCenter;
    }

    /**
     * Chin rotation checks.
     * Yaw: left/right turn of the head.
     */
    if (yaw < MIN_CHIN_XPOS) return GestureFeedbackMessages.HeadTurnedLeft;
    if (yaw > MAX_CHIN_XPOS) return GestureFeedbackMessages.HeadTurnedRight;

    /**
     * Pitch: chin up/down.
     */
    if (pitch < MIN_CHIN_YPOS) return GestureFeedbackMessages.HeadTiltedUp;
    if (pitch > MAX_CHIN_YPOS) return GestureFeedbackMessages.HeadTiltedDown;

    /**
     * Roll: head tilted towards shoulders.
     */
    if (roll < -0.25) return GestureFeedbackMessages.HeadTiltedRight;
    if (roll > 0.25) return GestureFeedbackMessages.HeadTiltedLeft;

    // If none of the conditions are triggered, we consider the position acceptable.
    return undefined;
  };

  useEffect(() => {
    const feedback = getFeedbackMessage();

    if (typeof feedback === "string") {
      // If a feedback message is defined, update immediately.
      setGestureFeedbackMsg(feedback);
      // Reset our success timer if we detect any error/guidance.
      successStartTimeRef.current = null;
    } else {
      // If feedback is undefined, check if the successful state has persisted for 1 second.
      if (successStartTimeRef.current === null) {
        successStartTimeRef.current = Date.now();
      } else if (Date.now() - successStartTimeRef.current >= 1000) {
        setGestureFeedbackMsg(GestureFeedbackMessages.Success);
      }
    }
  }, [
    detectionResults,
    minHeadXPos,
    maxHeadXPos,
    box,
    boxSize,
    pitch,
    roll,
    yaw,
  ]);

  return { gestureFeedbackMsg };
};

export default useGestureFeedback;
