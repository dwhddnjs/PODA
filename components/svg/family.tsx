import * as React from "react"
import { SVGProps } from "react"

interface SvgProps extends SVGProps<SVGSVGElement> {
  moodData?: string
}

export const FamilySvg = ({ moodData, ...props }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill="none"
      className=""
      {...props}>
      <path
        fill={`var(--emotion-${moodData})`}
        d="M10.854 1.5c0-.833.66-1.5 1.484-1.5s1.484.667 1.484 1.5-.66 1.5-1.484 1.5a1.487 1.487 0 0 1-1.484-1.5ZM13.822 15v-4.5h1.856l-1.886-5.723a1.493 1.493 0 0 0-1.41-1.027h-.089c-.638 0-1.21.412-1.41 1.027l-.638 1.936A2.619 2.619 0 0 1 11.595 9v6h2.227ZM8.256 7.125c.616 0 1.113-.503 1.113-1.125s-.497-1.125-1.113-1.125S7.143 5.378 7.143 6s.497 1.125 1.113 1.125ZM3.061 3c.824 0 1.485-.667 1.485-1.5S3.886 0 3.06 0c-.823 0-1.484.667-1.484 1.5S2.237 3 3.061 3Zm1.485 12V9.75h1.113v-4.5c0-.825-.668-1.5-1.484-1.5H1.948c-.816 0-1.484.675-1.484 1.5v4.5h1.113V15h2.969Zm4.823 0v-3h.743V9c0-.615-.505-1.125-1.114-1.125H7.514c-.608 0-1.113.51-1.113 1.125v3h.742v3h2.226Z"
      />
    </svg>
  )
}
