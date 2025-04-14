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
} from "@/app/lib/constants/gesture-coords";

/**
 * Computes interpolated horizontal thresholds based on the face box size.
 */
export const getInterpolatedThresholds = (boxSize: number): Thresholds => {
    // Clamp boxSize to prevent extrapolation.
    const clampedSize = Math.max(Math.min(boxSize, MAX_HEAD_SIZE), MIN_HEAD_SIZE);
    const progress = (clampedSize - MIN_HEAD_SIZE) / (MAX_HEAD_SIZE - MIN_HEAD_SIZE);
    return {
        minHeadXPos: lerp(MIN_HEAD_XPOS_MIN_SIZE, MIN_HEAD_XPOS_MAX_SIZE, progress),
        maxHeadXPos: lerp(MAX_HEAD_XPOS_MIN_SIZE, MAX_HEAD_XPOS_MAX_SIZE, progress),
    };
};

/**
 * Determines the gesture feedback based on detection results and thresholds.
 */
export const determineFeedback = (
    results: Result | null,
    thresholds: Thresholds
): GestureFeedbackMessagesType | undefined => {
    // Check if a face is detected.
    if (!results || !results.face || results.face.length === 0) {
        return GestureFeedbackMessages.NoFace;
    }
    const face = results.face[0];
    // If hands are detected, prioritize that feedback.
    if (results.hand && results.hand[0]?.score) {
        return GestureFeedbackMessages.Hands;
    }
    // Check distance based on face size.
    const boxSize = face.size ? face.size[0] : 0;
    if (boxSize < MIN_HEAD_SIZE) return GestureFeedbackMessages.TooFar;
    if (boxSize > MAX_HEAD_SIZE) return GestureFeedbackMessages.TooClose;

    // Use horizontal box position with dynamic thresholds.
    const box = face.boxRaw;
    if (!box) return GestureFeedbackMessages.NoFace;
    // For example, if the left edge is greater than the minimum threshold or
    // the left edge is less than the maximum threshold (this logic might be adjusted
    // based on your coordinate system), return off-center.
    if (box[0] > thresholds.minHeadXPos || box[0] < thresholds.maxHeadXPos) {
        return GestureFeedbackMessages.OffCenter;
    }

    // Check face rotation.
    const pitch = face.rotation?.angle?.pitch ?? 0;
    const roll = face.rotation?.angle?.roll ?? 0;
    const yaw = face.rotation?.angle?.yaw ?? 0;
    if (yaw < -0.25) return GestureFeedbackMessages.HeadTurnedLeft;
    if (yaw > 0.15) return GestureFeedbackMessages.HeadTurnedRight;
    if (pitch < -0.3) return GestureFeedbackMessages.HeadTiltedUp;
    if (pitch > 0.25) return GestureFeedbackMessages.HeadTiltedDown;
    if (roll < -0.25) return GestureFeedbackMessages.HeadTiltedRight;
    if (roll > 0.25) return GestureFeedbackMessages.HeadTiltedLeft;

    // If no conditions are triggered, return undefined to signal success.
    return undefined;
};