import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function CartIcon(props: SvgProps) {
  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="none"
      {...props}
    >
      <Path
        d="M4 5.414L.757 2.172 2.172.757 5.414 4h15.242a1 1 0 01.958 1.287l-2.4 8a1 1 0 01-.958.713H6v2h11v2H5a1 1 0 01-1-1V5.414zM6 6v6h11.512l1.8-6H6zm-.5 16a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm12 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
        fill="#9C9EA8"
      />
    </Svg>
  )
}

export default CartIcon
