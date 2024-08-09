import * as React from "react"
import { SVGProps } from "react"

interface SvgProps extends SVGProps<SVGSVGElement> {
  moodData?: string
}
export const ExhaustionSvg = ({ moodData, ...props }: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}>
    <g clipPath="url(#a)">
      <path
        fill={`var(--emotion-${moodData})`}
        d="M12 24a12 12 0 1 0 0-24 12 12 0 0 0 0 24Zm-4.28-8.592C8.752 14.377 10.247 13.5 12 13.5c1.753 0 3.248.877 4.28 1.908.52.52.942 1.097 1.237 1.66.29.548.483 1.143.483 1.682a.76.76 0 0 1-.323.619.738.738 0 0 1-.69.084l-.96-.36a11.25 11.25 0 0 0-3.952-.718h-.15c-1.35 0-2.686.244-3.952.717l-.96.361A.75.75 0 0 1 6 18.75c0-.544.197-1.134.483-1.683a6.977 6.977 0 0 1 1.237-1.66ZM6.258 6.877l4.214 2.245a.713.713 0 0 1 0 1.256l-4.214 2.245a.558.558 0 0 1-.82-.492c0-.131.046-.258.13-.356L7.257 9.75 5.57 7.725a.548.548 0 0 1-.131-.356c0-.422.45-.69.82-.492Zm12.305.487a.548.548 0 0 1-.132.356l-1.687 2.025 1.687 2.025a.548.548 0 0 1 .131.357c0 .421-.45.689-.82.492l-4.214-2.246a.713.713 0 0 1 0-1.256l4.214-2.245c.37-.197.82.07.82.492Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
)
