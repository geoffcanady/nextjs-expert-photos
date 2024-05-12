export default function CameraGuideBottomRight({
  feedbackColor,
}: {
  feedbackColor: string;
}) {
  return (
    <svg
      version="1.1"
      id="camera-guide-bottom-right"
      x="0px"
      y="0px"
      viewBox="0 0 30.8 33"
      enableBackground="new 0 0 30.8 33"
    >
      <path
        id="camera-guide-bottom-right-path"
        fill="none"
        stroke={feedbackColor}
        strokeWidth="2"
        strokeLinecap="round"
        d="M29.8,1v2.2C29.8,19.1,16.9,32,1,32
	l0,0"
      />
    </svg>
  );
}
