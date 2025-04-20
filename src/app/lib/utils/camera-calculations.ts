export interface CropDimensions {
    sX: number;
    sY: number;
    sW: number;
    sH: number;
}

/**
 * Calculates the cropping dimensions to maintain the aspect ratio.
 */
export const calculateCropDimensions = (
    playerWidth: number,
    playerHeight: number,
    containerWidth: number,
    containerHeight: number
): CropDimensions => {
    const playerAR = playerWidth / playerHeight;
    const canvasAR = containerWidth / containerHeight;

    let sX = 0, sY = 0, sW = 0, sH = 0;
    if (playerAR > canvasAR) {
        // Video is wider than container: crop sides.
        sH = playerHeight;
        sW = playerHeight * canvasAR;
        sX = (playerWidth - sW) / 2;
        sY = 0;
    } else {
        // Video is taller than container: crop top and bottom.
        sW = playerWidth;
        sH = playerWidth / canvasAR;
        sX = 0;
        sY = (playerHeight - sH) / 2;
    }
    return { sX, sY, sW, sH };
};
