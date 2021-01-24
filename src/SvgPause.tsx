import * as React from 'react';

interface SvgPauseProps {
  width?: number,
  height?: number
}
const SvgPause = (props: SvgPauseProps)=>(
  <g id="pause-icon" stroke="white" strokeWidth="1">
   <rect x="45%" y="85%" width={props.width || 1} height={props.height || 10} />
   <rect x="50%" y="85%" width={props.width || 1}  height={props.height || 10} />
  </g>
)

export default SvgPause;
