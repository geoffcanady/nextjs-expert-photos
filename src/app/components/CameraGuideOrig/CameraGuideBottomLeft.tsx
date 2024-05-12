export default function CameraGuideBottomLeft({
  feedbackColor,
}: {
  feedbackColor: string;
}) {
  return (
    <svg
      id="camera-guide-bottom-left"
      x="0px"
      y="0px"
      viewBox="0 0 33 30.8"
      enableBackground="new 0 0 33 30.8"
    >
      <path
        id="camera-guide-bottom-left-path"
        fill="none"
        stroke={feedbackColor}
        strokeWidth="2"
        strokeLinecap="round"
        d="M32,29.8h-2.2C13.9,29.8,1,16.9,1,1
	l0,0"
      />
    </svg>
  );
}
