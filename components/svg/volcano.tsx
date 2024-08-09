import * as React from "react"
import { SVGProps } from "react"
interface SvgProps extends SVGProps<SVGSVGElement> {
  moodData?: string
}
export const VolcanoSvg = ({ moodData, ...props }: SvgProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}>
    <path
      fill={`var(--emotion-${moodData})`}
      fillRule="evenodd"
      d="M11.918 0a4.852 4.852 0 0 0-3.909 1.975A4.053 4.053 0 1 0 6.32 9.71h1.694V7.668a1.071 1.071 0 1 1 2.143 0v4.874h3.524V7.668a1.072 1.072 0 0 1 2.143 0V9.71h1.694a4.053 4.053 0 1 0-1.69-7.737A4.849 4.849 0 0 0 11.916 0ZM7.106 15.326a.857.857 0 0 1 .857-.857h7.917a.857.857 0 0 1 .857.857c0 1.572 1.049 3.061 2.525 4.333a16.765 16.765 0 0 0 4.06 2.538.857.857 0 0 1-.335 1.645H.856a.857.857 0 0 1-.335-1.645 16.764 16.764 0 0 0 4.06-2.538c1.474-1.272 2.525-2.761 2.525-4.333Z"
      clipRule="evenodd"
    />
  </svg>
)
