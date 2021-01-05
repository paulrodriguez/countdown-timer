// NOTE: install core-js in order to use javascript functions


import * as React from 'react';

import CountdownTimer from './CountdownTimer';



export default {
  title: "CountdownTimer"
};


export const AutoPlayTimer = () => (<CountdownTimer minutes={0} seconds={10} autoplay={true} />);
export const DefaultTimer  = () => (<CountdownTimer minutes={0} seconds={10}  />);
