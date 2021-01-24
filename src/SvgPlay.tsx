import * as React from 'react';

interface SvgPlayProps {
  stroke?: string,
  fill?: string
}

const SvgPlay = (props: SvgPlayProps) => (
  <g id="play-icon" stroke={props.stroke || "white"} fill={props.fill || "white"}>
   <polygon points="45.5,110.5 52.5,115.5 45.5,120.5" />
  </g>
)

export default SvgPlay;
