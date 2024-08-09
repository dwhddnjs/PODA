import * as React from "react"
import { SVGProps } from "react"

interface SvgProps extends SVGProps<SVGSVGElement> {
  moodData?: string
}
export const PregnantSvg = ({ moodData, ...props }: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}>
    <g fill={`var(--emotion-${moodData})`} clipPath="url(#a)">
      <path d="M14.5 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
      <path
        fillRule="evenodd"
        d="M10.825 13.735a1 1 0 0 1-.413-.176l-2.75-2a1 1 0 0 1-.255-1.346v-.001l.002-.002.005-.008.016-.025a21.028 21.028 0 0 1 .998-1.413 9.79 9.79 0 0 1 .924-1.057c.16-.154.345-.31.543-.435.178-.112.481-.272.855-.272h1a1 1 0 0 1 .588.191h.001l.001.002.003.002.008.006.03.022.1.077a16.515 16.515 0 0 1 1.476 1.306c.85.85 1.898 2.088 2.472 3.523.332.83.34 1.61.074 2.296-.257.66-.726 1.127-1.165 1.446-.44.32-.903.53-1.242.658a5.808 5.808 0 0 1-.365.125L13 20.5v.5a1 1 0 1 1-2 0v-.5c0-2.927-.002-4.829-.175-6.765Zm-.329-2.587a52.685 52.685 0 0 0-.257-1.45 16.099 16.099 0 0 0-.618.813l.875.636Z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
)
