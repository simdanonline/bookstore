import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function HomeIcon(props: SvgProps) {
  return (
    <Svg
      width={18}
      height={19}
      viewBox="0 0 18 19"
      fill="none"
      {...props}
    >
      <Path
        d="M18 18a1 1 0 01-1 1H1a1 1 0 01-1-1V7.49a1 1 0 01.386-.79l8-6.222a1 1 0 011.228 0l8 6.222a1 1 0 01.386.79V18zm-2-1V7.978L9 2.534 2 7.978V17h14z"
        fill="#06070D"
      />
    </Svg>
  )
}

export default HomeIcon
