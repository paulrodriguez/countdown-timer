import * as React from 'react';
import { shallow } from 'enzyme';

import CountdownTimer from '../src/CountdownTimer/CountdownTimer';

test('CountdownTimer is initialized correctly', ()=> {
  const timer = shallow(<CountdownTimer minutes={0} seconds={10} />);

  expect(timer).toMatchSnapshot();

})

test('Countdown timer toggles to pause icon when play button is clicked', ()=>{
  const timer = shallow(<CountdownTimer minutes={0} seconds={10} />);

  expect(timer.find('SvgPlay')).toHaveLength(1);
  timer.find("#toggle-play").simulate('click');
  expect(timer.state('seconds')).toBe(10);
  expect(timer.find('SvgPause')).toHaveLength(1);
  expect(timer.find("SvgPlay")).toHaveLength(0);
});

test('Countdown timer shows pause icon with autoplay', ()=>{
  const timer = shallow(<CountdownTimer minutes={0} seconds={10} autoplay={true} />);

  expect(timer.state('active')).toBeTruthy();
  expect(timer.state('seconds')).toBe(10);
  expect(timer.find('SvgPause')).toHaveLength(1);
});
