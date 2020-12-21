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
radius: Number, default=35
the radius of the timer circle.
defaults to 35 based on viewBox of SVG

autoplay: Boolean
determines whether the timer should start playing when it is not active,
which is usually when it is rendered for the first time or it has finished
a cycle.

timer_remaining_id: string, default='base-timer-path-remaining'
the id of the svg circle that shrinks as the countdown happens

onTogglePlay(isPaused: bool, isActive:bool): function, optional
a callback function when the play/pause button is clicked

onComplete: function, optional
callback function when the timer has completed

minutes: Number, required
total minutes for timer

seconds: number, required
total seconds for timer

warning_threshold: number, optional, default=0.5
the threshold value to change the color of the timer circle to indicate
it has reached a certain point.
