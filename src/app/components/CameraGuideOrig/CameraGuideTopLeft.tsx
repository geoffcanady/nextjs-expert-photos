// default stroke color:
// success  stroke color: 2CA01C
// error stroke color: CB3534
export default function CameraGuideTopLeft({
  feedbackColor,
}: {
  feedbackColor: string;
}) {
  return (
    <svg
      id="camera-guide-top-left"
      x="0px"
      y="0px"
      viewBox="0 0 30.8 33"
      enableBackground="new 0 0 30.8 33"
    >
      <path
        id="camera-guide-top-left-path"
        fill="none"
        stroke={feedbackColor}
        strokeWidth="2"
        strokeLinecap="round"
        d="M1,32v-2.2C1,13.9,13.9,1,29.8,1l0,0"
      />
    </svg>
  );
}
