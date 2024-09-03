export default function IconCircleBlue({
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
      width="4"
      height="4"
      viewBox="0 0 4 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="1.56825" cy="1.56825" r="1.56825" fill="#236CFF" />
    </svg>
  );
}
