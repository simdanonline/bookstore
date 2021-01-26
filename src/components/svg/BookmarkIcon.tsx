import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function BookmarkIcon(props: SvgProps) {
  return (
    <Svg
      width={14}
      height={21}
      viewBox="0 0 14 21"
      fill="none"
      {...props}
    >
      <Path
        d="M1 0h12a1 1 0 011 1v19.143a.5.5 0 01-.766.424L7 16.03.766 20.566A.5.5 0 010 20.143V1a1 1 0 011-1zm11 2H2v15.432l5-3.761 5 3.761V2z"
        fill="#9C9EA8"
      />
    </Svg>
  )
}

export default BookmarkIcon
