# React Countdown Timer

## Description
A React countdown timer built using SVG graphics to show circle timer
progress.

## Installation
```
npm install git+https://github.com/paulrodriguez/countdown-timer.git#master
```

## Usage
importing the component
```
import * as CountdownTimer from 'countdown-timer'
```

Basic component
```
<CountdownTimer minutes={1} seconds={1} />
```

### Examples
[click here to view the storybook examples](https://www.chromatic.com/component?appId=6004c8b65f88f20021ddc457&name=CountdownTimer)


start storybook by running the command ```npm run storybook```
you will be taken to a page showing some examples of the timer with different configurations

### Props
| Name | Type | Description | Required | Default |
| ---- | ---- | ----------- | -------- | ------- |
| minutes | number | the total minutes to add to the timer | Yes |
seconds | number | the total seconds to add to the timer | Yes |
|radius | Number | the radius of the circle | No | 35 |
| autoplay | Boolean | determines whether to autoplay on mount | No | False |
| timer_remaining_id | string | id for animated circle | No | "base-timer-path-remaining" |
| onTogglePlay | function(isPaused: boolean, isActive: boolean) | callback function when play/pause button is clicked, passing the flags whether timer is paused or active after changing state | No |
onComplete | function | callback when timer has finished. returns an array of three values in the following order:<br /> restart: boolean specified whether the timer can start over <br />minutes: string\|number specifies the number of minutes to apply for when the timer restarts <br />seconds: string\|number specifies the number of seconds to apply for when the timer restarts | No |
onTick | function(timePassed: number) | callback whenever the timer changes between two frames. it accepts the total time passed in the number of seconds. | No |
width | number | width of graphic | No | 300 |
height | number | height of graphic | No | 300 |
warning_threshold | number | determines at what point in the timer should the color of the circle change. value should be between 0 and 1 | No | 0.5
