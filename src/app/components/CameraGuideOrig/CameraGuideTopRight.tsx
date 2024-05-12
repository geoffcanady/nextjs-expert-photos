export default function CameraGuideTopRight({
  feedbackColor,
}: {
  feedbackColor: string;
}) {
  return (
    <svg
      id="camera-guide-top-right"
      x="0px"
      y="0px"
      viewBox="0 0 33 30.8"
      enableBackground="new 0 0 33 30.8"
    >
      <path
        id="camera-guide-top-right-path"
        fill="none"
        stroke={feedbackColor}
        strokeWidth="2"
        strokeLinecap="round"
        d="M1,1h2.2C19.1,1,32,13.9,32,29.8l0,0"
      />
    </svg>
  );
}
