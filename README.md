# React Countdown Timer

## Description
A React countdown timer built using SVG graphics to show circle timer
progress.

## Installation
```npm install git+https://github.com/paulrodriguez/countdown-timer.git```

## Usage
importing component
```
import * as CountdownTimer from 'countdown-timer'
```

### Props
| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
|radius | Number | the radius of the circle | 35 |
| autoplay | Boolean | determines whether to autoplay on mount | False |
| timer_remaining_id | string | id for animated circle | "base-timer-path-remaining" |
| onTogglePlay(isPaused, isActive) | function | callback function when play/pause button is clicked, passing the flags whether timer is paused or active after changing state |
onComplete | function | callback when timer has finished |
canRestart | function | called after timer completes | determines whether the timer can restart again (warming: this may cause an infinite loop if not careful) |
| minutes | number | the total minutes to add to the timer |
seconds | number | the total seconds to add to the timer |
warning_threshold | number | value to change the color of the timer after it reaches a certain period | 0.5
