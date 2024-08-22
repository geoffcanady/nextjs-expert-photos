import { useState, useEffect, useRef } from "react";
import { Result } from "@vladmandic/human";
import { GestureFeedbackMessages, GestureFeedbackMessagesType } from "@/app/lib/types/enums";

export const useGestureFeedback = (detectionResults: Result | null) => {
  const [gestureFeedbackMsg, setGestureFeedbackMsg] =
    useState<GestureFeedbackMessagesType>(GestureFeedbackMessages.Empty);

  /**
   * Destructure results.
   */
  const results = detectionResults;
  const face = results?.face[0];
  // const box = face?.box;
  const box = face?.boxRaw;
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
   * Feedback priority:
   * 1. No head/face present.
   * 2. Hands present
   * 3. Distance / proximity
   * 4. Centered vertically / horizontally w/in the camera guide
   * 5. Chin turned left/right
   * 6. Chin tilted up/down
   * 7. Head tilted towards shoulders
   */

  const getFeedbackMessage = (): GestureFeedbackMessagesType => {
    /**
     * No face detected.
     */
    if (!boxSize || !face) return GestureFeedbackMessages.NoFace;

    /**
     * Hands.
     */
    if (results?.hand[0]?.score) return GestureFeedbackMessages.Hands;

    /**
     * Distance from camera.
     */
    // console.log("boxSize: ", boxSize?.[0]);
    if (boxSize && boxSize?.[0] < 400) return GestureFeedbackMessages.TooFar;
    if (boxSize && boxSize?.[0] > 600) return GestureFeedbackMessages.TooClose;

    /**
     * Head centering. Values decrease left side of screen to right.
     */
    // Horizontal centering
    // Left side
    // console.log("box: ", box?.[0]);
    if (box && box?.[0] > 0.38) return GestureFeedbackMessages.OffCenter;
    // Right side
    if (box && box?.[0] < 0.18) return GestureFeedbackMessages.OffCenter;
    // Vertical centering
    // Top
    if (box && box?.[1] < 0.25) return GestureFeedbackMessages.OffCenter;
    // Bottom
    if (box && box?.[1] > 0.4) return GestureFeedbackMessages.OffCenter;

    /**
     * Chin up/down
     */
    if (pitch < -0.25) return GestureFeedbackMessages.HeadTiltedUp;
    if (pitch > 0.25) return GestureFeedbackMessages.HeadTiltedDown;

    /**
     * Chin left / right
     */
    if (yaw < -0.25) return GestureFeedbackMessages.HeadTurnedLeft;
    if (yaw > 0.15) return GestureFeedbackMessages.HeadTurnedRight;

    /**
     * Head tilted towards shoulders
     */
    if (roll < -0.25) return GestureFeedbackMessages.HeadTiltedRight;
    if (roll > 0.25) return GestureFeedbackMessages.HeadTiltedLeft;

    // return GestureFeedbackMessages.Success;
  };

  // useEffect(() => {
  //   const feedbackMessage = getFeedbackMessage();
  //   // console.log('FEEDBACK MSG,', feedbackMessage);
  //   setGestureFeedbackMsg(feedbackMessage);
  // }, [detectionResults]);

  const lastUpdateTime = useRef(0);
  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const currentTime = Date.now();
    const feedbackMessage = getFeedbackMessage();

    if (feedbackMessage === undefined) {
      // Cancel the throttle and set success message
      lastUpdateTime.current = 0;
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
      
      setGestureFeedbackMsg(GestureFeedbackMessages.Success);
      return;
    }

    if (currentTime - lastUpdateTime.current < 5000) {
      return; // Skip if less than 5 seconds have passed
    }

    lastUpdateTime.current = currentTime;
 
    if (feedbackMessage !== undefined) {
      // App is in an error state
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }

      errorTimeoutRef.current = setTimeout(() => {
        setGestureFeedbackMsg(feedbackMessage);

        setTimeout(() => {
          setGestureFeedbackMsg(GestureFeedbackMessages.Empty);
        }, 2000);
      }, 1000);
    }
  }, [detectionResults]);

  useEffect(() => {
    return () => {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
    };
  }, []);

  return { gestureFeedbackMsg };
};

export default useGestureFeedback;
