export default function IconSparkle({
  id,
  className,
}: {
  id?: string;
  className?: string;
}) {
  return (
    <svg
      id={id}
      className={className}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.70476 0C3.83864 0 3.13651 0.702132 3.13651 1.56825V3.13693H1.56825C0.702131 3.13693 0 3.83906 0 4.70518C0 5.57131 0.702132 6.27344 1.56825 6.27344H3.13651V7.84127C3.13651 8.70739 3.83864 9.40952 4.70476 9.40952C5.57088 9.40952 6.27302 8.70739 6.27302 7.84127V6.27344H7.84127C8.70739 6.27344 9.40952 5.57131 9.40952 4.70518C9.40952 3.83906 8.70739 3.13693 7.84127 3.13693H6.27302V1.56825C6.27302 0.702131 5.57088 0 4.70476 0Z"
        fill="#236CFF"
      />
    </svg>
  );
}
