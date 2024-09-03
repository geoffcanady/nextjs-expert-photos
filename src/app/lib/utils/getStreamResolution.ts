export default function getStreamResolution(stream: MediaStream): void {
  const videoTracks = stream.getVideoTracks();
  if (videoTracks.length > 0) {
    const settings = videoTracks[0].getSettings();
    console.log("Stream resolution: ", `${settings.width}x${settings.height}`);
  } else {
    console.log("No video tracks available");
  }
}
