import * as React from "react"
import { SVGProps } from "react"

interface SvgProps extends SVGProps<SVGSVGElement> {
  moodData?: string
}
export const ComfortSvg = ({ moodData, ...props }: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <mask
      id="a"
      width={20}
      height={22}
      x={2}
      y={1}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 19V2M4 20h13l3-3M7.5 20v2m8.5-2v2"
      />
      <path
        fill="#555"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 3c-4.97 0-9 4.017-9 8.972V13c0-1.239 1.008-2.5 2.25-2.5S7.5 11.761 7.5 13c0-1.239 1.008-2.5 2.25-2.5S12 11.761 12 13c0-1.239 1.008-2.5 2.25-2.5s2.25 1.261 2.25 2.5c0-1.239 1.008-2.5 2.25-2.5S21 11.761 21 13v-1.028C21 7.017 16.97 3 12 3Z"
      />
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7.5 13s-.75-2.75.5-5.5S12 3 12 3m0 0s2.25 1.25 3.5 4.5 1 5.5 1 5.5M12 3v9.5"
      />
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M18.75 10.5c-1.242 0-2.25 1.261-2.25 2.5 0-1.239-1.008-2.5-2.25-2.5S12 11.761 12 13c0-1.239-1.008-2.5-2.25-2.5S7.5 11.761 7.5 13c0-1.239-1.008-2.5-2.25-2.5M7.867 4A8.988 8.988 0 0 1 12 3c1.49 0 2.895.361 4.133 1"
      />
    </mask>
    <g mask="url(#a)">
      <path fill={`var(--emotion-${moodData})`} d="M0 0h24v24H0V0Z" />
    </g>
  </svg>
)
