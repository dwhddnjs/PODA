import * as React from "react"
import { SVGProps } from "react"

interface SvgProps extends SVGProps<SVGSVGElement> {
  moodData?: string
}
export const CrampsSvg = ({ moodData, ...props }: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}>
    <g fill={`var(--emotion-${moodData})`}>
      <path d="M11.988 5.25a2.625 2.625 0 1 0 0-5.25 2.625 2.625 0 0 0 0 5.25ZM18.498 13.027l-.484-1.613v-.006L16.961 7.9h-.002l-.118-.396A2.103 2.103 0 0 0 14.826 6H9.2a2.102 2.102 0 0 0-2.016 1.503l-.118.396h-.003l-1.052 3.51v.005l-.486 1.613c-.147.487.107 1.015.589 1.178a.937.937 0 0 0 1.2-.618l1.199-3.996.102-.339a.375.375 0 0 1 .72.198l-2.05 6.834a.75.75 0 0 0 .718.966h1.36v5.376c0 .772.493 1.374 1.124 1.374.632 0 1.125-.602 1.125-1.374V17.25h.75v5.376c0 .772.494 1.374 1.125 1.374.632 0 1.125-.602 1.125-1.374V17.25h1.407a.75.75 0 0 0 .718-.966l-2.05-6.834a.374.374 0 0 1 .72-.198l.102.339 1.199 3.996a.939.939 0 0 0 1.2.616c.48-.161.735-.69.59-1.176Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
)
