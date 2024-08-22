import styled from "styled-components";

export const StyledRadialGrad = styled.svg`
  position: fixed;
  bottom: -10vh;
`;

export default function RadialGrad() {
  return (
    <StyledRadialGrad
      width="1366"
      height="389"
      viewBox="0 0 1366 389"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.5" filter="url(#filter0_f_1027_1899)">
        <ellipse cx="683" cy="609" rx="562" ry="309" fill="#7CBCFF" />
      </g>
      <defs>
        <filter
          id="filter0_f_1027_1899"
          x="-179"
          y="0"
          width="1724"
          height="1218"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="150"
            result="effect1_foregroundBlur_1027_1899"
          />
        </filter>
      </defs>
    </StyledRadialGrad>
  );
}
