/**
 * Set min and max head sizes. These values can be adjusted as needed.
 */
export const MIN_HEAD_SIZE = 360;
export const MAX_HEAD_SIZE = 580;

/**
 * Positional thresholds at the minimum head size.
 * These correspond to a scenario where the user's head is farther away.
 */
export const MIN_HEAD_XPOS_MIN_SIZE = 0.42;
export const MAX_HEAD_XPOS_MIN_SIZE = 0.2;
export const MIN_HEAD_YPOS_MIN_SIZE = 0.15;
export const MAX_HEAD_YPOS_MIN_SIZE = 0.35;

/**
 * Positional thresholds at the maximum head size.
 * These correspond to a scenario where the user's head is closer.
 */
export const MIN_HEAD_XPOS_MAX_SIZE = 0.29;
export const MAX_HEAD_XPOS_MAX_SIZE = 0.19;
export const MIN_HEAD_YPOS_MAX_SIZE = 0.17;
export const MAX_HEAD_YPOS_MAX_SIZE = 0.21;

/**
 * Chin rotation thresholds (unchanged).
 * Pitch - chin up/down.
 * Roll - head tilted towards shoulder.
 * Yaw - chin left / right.
 */
export const MIN_CHIN_XPOS = -0.25;
export const MAX_CHIN_XPOS = 0.15;
export const MIN_CHIN_YPOS = -0.5;
export const MAX_CHIN_YPOS = 0.5;
