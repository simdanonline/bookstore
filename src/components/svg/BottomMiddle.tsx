import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

function BottomMiddle(props: SvgProps) {
  return (
    <Svg
      width={188}
      height={188}
      viewBox="0 0 188 188"
      fill="none"
      opacity={.1}
      {...props}
    >
      <Path
        d="M151.82 169.977c-.006-35.629-14.106-69.797-39.199-94.987C87.527 49.8 53.497 35.652 18.015 35.656A17.565 17.565 0 015.569 30.48 17.71 17.71 0 01.414 17.983c0-4.688 1.854-9.183 5.155-12.498A17.565 17.565 0 0118.015.308c93.345 0 169.018 75.963 169.018 169.667 0 4.689-1.855 9.186-5.157 12.502a17.57 17.57 0 01-12.449 5.177 17.569 17.569 0 01-12.449-5.177 17.719 17.719 0 01-5.157-12.502l-.001.002z"
        fill="#E5E0D5"
      />
    </Svg>
  );
}

export default BottomMiddle;
