import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

function TopRight(props: SvgProps) {
  return (
    <Svg
      width={167}
      height={165}
      viewBox="0 0 167 165"
      fill="none"
      {...props}
      opacity={0.1}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M131.083 146.813a113.521 113.521 0 00-8.582-43.29 113.16 113.16 0 00-24.427-36.698A112.631 112.631 0 0061.52 42.307a112.259 112.259 0 00-43.115-8.605 17.565 17.565 0 01-12.446-5.176A17.711 17.711 0 01.804 16.028 17.71 17.71 0 015.959 3.531a17.565 17.565 0 0112.446-5.177c81.678 0 147.891 66.465 147.891 148.458 0 4.689-1.855 9.187-5.157 12.502a17.571 17.571 0 01-12.449 5.178 17.571 17.571 0 01-12.449-5.178 17.717 17.717 0 01-5.157-12.502l-.001.001z"
        fill="#EDEDEF"
      />
    </Svg>
  );
}

export default TopRight;
