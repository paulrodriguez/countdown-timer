// NOTE: install core-js in order to use javascript functions


import * as React from 'react';

import CountdownTimer from './CountdownTimer';



export default {
  title: "CountdownTimer"
};

const onTogglePauseAlert = (isPaused: boolean, isActive: boolean) => {
  if(isPaused) {
    alert("timer paused");
  }
};


export const AutoPlayTimer = () => (<CountdownTimer minutes={0} seconds={10} autoplay={true} />);
export const DefaultTimer  = () => (<CountdownTimer minutes={0} seconds={10}  />);
export const ThresholdTimer  = () => (<CountdownTimer minutes={0} seconds={10} warning_threshold={0.25}  />);
export const OnPauseShowAlertTimer  = () => (<CountdownTimer minutes={0} seconds={10} onTogglePlay={onTogglePauseAlert}  />);
