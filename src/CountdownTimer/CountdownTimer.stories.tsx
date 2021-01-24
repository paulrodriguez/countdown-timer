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

const onComplete = () => {
  return [true, 2, 10];
}

const onCompleteVoid = () => {
  alert('timer is done');
}
export const DefaultTimer  = () => (
  <>
    <h1>Minimal configuration</h1>
    <CountdownTimer minutes={0} seconds={10}  />
  </>
);
export const AutoPlayTimer = () => (
  <>
    <h1>Autoplay</h1>
    <p>starts timer when the component is mounted</p>
    <CountdownTimer minutes={0} seconds={10} autoplay={true} />
  </>
);

export const ThresholdTimer  = () => (
  <>
    <h1>Change Default Threshold</h1>
    <p>changes threshold value so circle color changes a quarter of the way from finishing</p>
    <CountdownTimer minutes={0} seconds={10} warning_threshold={0.25}  />
  </>
);
export const OnPauseShowAlertTimer = () => (
  <>
    <h1>onTogglePlay callback</h1>
    <p>show alert box when the pause/play button is clicked. only shows when the timer is paused</p>
    <CountdownTimer minutes={0} seconds={10} onTogglePlay={onTogglePauseAlert}  />
  </>
);
export const OnCompleteRestartTimer = () => (
  <>
  <h1>onComplete Reset Timer</h1>
  <p>resets timer with onComplete callback by returning the array true, 2, 10]</p>
  <CountdownTimer minutes={0} seconds={5} onComplete={onComplete}  />
  </>
);
export const OnCompleteVoidTimer = () => (
  <>
  <h1>onComplete Void</h1>
  <p>shows alert box with onComplete callback but does not return an array to prevent restarting</p>
  <CountdownTimer minutes={0} seconds={5} onComplete={onCompleteVoid}  />
  </>
);

export const CounterClockwiseTimer = () => (
  <>
  <h1>Counter-Clockwise</h1>
  <p>change direction circle shrinks by passing prop direction=&#123;&quot;right&quot;&#125;</p>
  <CountdownTimer minutes={0} seconds={5} direction={"right"}  />
  </>
);

export const SizeChangeTimer = () => (
  <>
  <h1>Different size</h1>
  <p>changing the size of the SVG element to width=500, height=400</p>
  <CountdownTimer minutes={0} seconds={5} width={500} height={400}  />
  </>
);
