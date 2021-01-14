# React Countdown Timer

## Description
A React countdown timer built using SVG graphics to show circle timer
progress.

## Installation
```npm install git+https://github.com/paulrodriguez/countdown-timer.git#master```

## Usage
importing the component
```
import * as CountdownTimer from 'countdown-timer'
```

### Examples
start storybook by running the command ```npm run storybook```
you should be taken to a page showing some examples of the timer with different configurations


### Props
| Name | Type | Description | Required | Default |
| ---- | ---- | ----------- | -------- | ------- |
|radius | Number | the radius of the circle | No | 35 |
| autoplay | Boolean | determines whether to autoplay on mount | No | False |
| timer_remaining_id | string | id for animated circle | No | "base-timer-path-remaining" |
| onTogglePlay(isPaused, isActive) | function | callback function when play/pause button is clicked, passing the flags whether timer is paused or active after changing state | No |
onComplete | function | callback when timer has finished | No |
canRestart | function | called after timer completes | determines whether the timer can restart again (warming: this may cause an infinite loop if not careful) | No |
| minutes | number | the total minutes to add to the timer | Yes |
seconds | number | the total seconds to add to the timer | Yes |
warning_threshold | number | value to change the color of the timer after it reaches a certain period | No | 0.5
