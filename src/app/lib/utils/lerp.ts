/**
 * Linear interpolation function to smoothly transition between min and max threshold values.
 * `progress` is a value between 0 and 1, representing how far along we are between MIN_HEAD_SIZE and MAX_HEAD_SIZE.
 */
export const lerp = (start: number, end: number, progress: number) => {
  return start + (end - start) * progress;
};
