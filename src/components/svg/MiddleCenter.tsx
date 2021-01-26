import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

function MiddleCenter(props: SvgProps) {
  return (
    <Svg width={156} height={96} viewBox="0 0 156 96" fill="none" opacity={.1} {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M35.404 18.484c0 22.488 18.584 41.314 42.253 41.314s42.255-18.826 42.255-41.314c0-4.69 1.855-9.186 5.157-12.501A17.566 17.566 0 01137.518.805a17.57 17.57 0 0112.449 5.178 17.714 17.714 0 015.156 12.5c0 42.701-35.012 76.725-77.466 76.725C35.203 95.208.19 61.184.19 18.484c0-4.69 1.855-9.186 5.157-12.501A17.57 17.57 0 0117.797.805c4.67 0 9.147 1.862 12.45 5.178a17.716 17.716 0 015.156 12.5z"
        fill="#fff"
      />
    </Svg>
  );
}

export default MiddleCenter;
