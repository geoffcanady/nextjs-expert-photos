/**
 * Calculates the FPS based on two timestamps.
 */
export const computeFps = (prevTimestamp: number, currentTimestamp: number): number => {
    const elapsed = currentTimestamp - prevTimestamp;
    return elapsed > 0 ? 1000 / elapsed : 0;
};