

function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css;
}

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

___$insertStyle("#timer-value {\n  font-size: 14pt;\n}\n\n.base-timer__path-remaining {\n  /* Rounds the line endings to create a seamless circle */\n  stroke-linecap: round;\n  /* Makes sure the animation starts at the top of the circle */\n  transform: rotate(-90deg);\n  transform-origin: center;\n  /* One second aligns with the speed of the countdown timer */\n  /* Allows the ring to change color when the color value updates */\n  stroke: green;\n}\n\n.timer-animate {\n  transition: 1s linear all;\n}\n\n.stroke-running {\n  stroke: #339900;\n}\n\n.stroke-warning {\n  stroke: #ff9966;\n}\n\n.base-timer__svg {\n  /* Flips the svg and makes the animation to move left-to-right */\n  transform: scaleX(-1);\n}\n\n.hide {\n  display: none;\n}\n\n.show {\n  display: block;\n}");

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var RADIUS = 35;
var TIMER_REMAINING_ID = 'base-timer-path-remaining';
var WARNING_THRESHOLD = 0.5;
var CountdownTimer = /** @class */ (function (_super) {
    __extends(CountdownTimer, _super);
    function CountdownTimer(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            radius: props.radius,
            id: props.timer_remaining_id,
            active: false,
            paused: false,
            finished: false,
            interval: null,
            animateTimer: false
        };
        _this.togglePlay = _this.togglePlay.bind(_this);
        _this.toggleAnimate = _this.toggleAnimate.bind(_this);
        _this.animateClass = _this.animateClass.bind(_this);
        return _this;
    }
    CountdownTimer.prototype.componentWillUnmount = function () {
        if (this.state.interval) {
            clearInterval(this.state.interval);
        }
    };
    CountdownTimer.prototype.componentDidUpdate = function () {
        if (this.state.active) {
            return;
        }
        if (this.props.autoplay) {
            this.startTimer();
        }
    };
    CountdownTimer.prototype.onComplete = function () {
        clearInterval(this.state.interval);
        this.setState({ active: false, paused: false, finished: true, interval: null }, this.toggleAnimate());
        if (this.props.onComplete) {
            this.props.onComplete();
        }
    };
    CountdownTimer.prototype.pad = function (number) {
        if (number == null) {
            return '00';
        }
        if (number <= 9 && number >= 0) {
            return '0' + number;
        }
        return number;
    };
    CountdownTimer.prototype.getCircumference = function () {
        var circum = 2 * Math.PI * this.state.radius;
        return Number(circum.toFixed(0));
    };
    CountdownTimer.prototype.toggleAnimate = function () {
        if (this.state.active) {
            this.setState({ animateTimer: true });
        }
        else {
            this.setState({ animateTimer: false });
        }
        return;
    };
    CountdownTimer.prototype.togglePlay = function () {
        if (!this.state.active) {
            if (this.props.onTogglePlay) {
                this.props.onTogglePlay(this.state.paused, this.state.active);
            }
            this.startTimer();
            return;
        }
        this.setState({ paused: !this.state.paused });
        if (this.props.onTogglePlay) {
            this.props.onTogglePlay(this.state.paused, this.state.active);
        }
    };
    CountdownTimer.prototype.startTimer = function () {
        var minutes = (isNaN(this.props.minutes) || this.props.minutes == "" || this.props.minutes == null) ? 0 : parseInt(this.props.minutes);
        var seconds = (isNaN(this.props.seconds) || this.props.seconds == "" || this.props.seconds == null) ? 0 : parseInt(this.props.seconds);
        this.setState({ minutes: minutes, seconds: seconds });
        var totalTime = minutes * 60 + seconds;
        this.setState({ currentTimeInSeconds: totalTime });
        this.setState({ timeLimit: totalTime });
        this.setState({ active: true });
        this.setState({ interval: setInterval(this.decrease.bind(this), 1000) });
    };
    CountdownTimer.prototype.getMinutes = function () {
        if (this.state.active) {
            return this.state.minutes;
        }
        return this.props.minutes;
    };
    CountdownTimer.prototype.getSeconds = function () {
        if (this.state.active) {
            return this.state.seconds;
        }
        return this.props.seconds;
    };
    CountdownTimer.prototype.decrease = function () {
        if (this.state.paused) {
            return;
        }
        if (this.state.currentTimeInSeconds <= 0) {
            this.onComplete();
            return;
        }
        this.toggleAnimate();
        var timeInSeconds = this.state.currentTimeInSeconds - 1;
        this.setState({ currentTimeInSeconds: timeInSeconds });
        if (this.state.seconds > 0) {
            this.setState({ seconds: this.state.seconds - 1 });
        }
        else {
            this.setState({ seconds: 59 });
            this.setState({ minutes: this.state.minutes - 1 });
        }
    };
    CountdownTimer.prototype.getTimeFraction = function () {
        var timeFraction = this.state.currentTimeInSeconds / this.state.timeLimit;
        return timeFraction - (1 / this.state.timeLimit) * (1 - timeFraction);
    };
    CountdownTimer.prototype.getRemaining = function () {
        return Math.max(this.getTimeFraction() * this.getCircumference(), 0);
    };
    CountdownTimer.prototype.getDashArray = function () {
        var circumference = this.getCircumference();
        if (!this.state.active) {
            return circumference + " " + circumference;
        }
        return this.getRemaining() + " " + this.getCircumference();
    };
    CountdownTimer.prototype.renderIcons = function () {
        if (this.state.active && !this.state.paused) {
            return (React.createElement("g", { id: "pause-icon", stroke: "white", "stroke-width": "1" },
                React.createElement("rect", { x: "45%", y: "85%", width: "1", height: "10" }),
                React.createElement("rect", { x: "50%", y: "85%", width: "1", height: "10" })));
        }
        if (!this.state.active || this.state.paused) {
            return (React.createElement("g", { id: "play-icon", stroke: "white", fill: "white" },
                React.createElement("polygon", { points: "47,110 53,115 47,120" })));
        }
    };
    CountdownTimer.prototype.animateClass = function () {
        if (this.state.animateTimer) {
            return 'timer-animate';
        }
        return '';
    };
    CountdownTimer.prototype.strokeClass = function () {
        if (!this.state.active) {
            return 'stroke-active';
        }
        if (this.state.currentTimeInSeconds / this.state.timeLimit <= this.props.warning_threshold) {
            return 'stroke-warning';
        }
        return 'stroke-active';
    };
    CountdownTimer.prototype.render = function () {
        var togglePlayStyle = { 'margin-left': '4px' };
        return (React.createElement("svg", { viewBox: "0 0 100 130", height: "300", width: "300", xmlns: "http://www.w3.org/2000/svg" },
            React.createElement("g", { className: "base-timer__circle", id: "base-timer-circle-group" },
                React.createElement("circle", { cx: "50%", cy: "50%", r: "35", fill: "white", stroke: "gray", "stroke-width": "2", "stroke-dasharray": "0", id: "base-timer-path-empty" }),
                React.createElement("circle", { cx: "50%", cy: "50%", r: this.state.radius, id: this.state.id, className: "base-timer__path-remaining " + this.animateClass() + " " + this.strokeClass(), fill: "transparent", "stroke-width": "2", "stroke-dasharray": this.getDashArray() }),
                React.createElement("text", { x: "28%", y: "55%", id: "timer-value" },
                    this.pad(this.getMinutes()),
                    ":",
                    this.pad(this.getSeconds()))),
            React.createElement("defs", null,
                React.createElement("linearGradient", { id: "pause-play-gradient", x1: "0%", y1: "0%", x2: "0%", y2: "100%", spreadMethod: "pad" },
                    React.createElement("stop", { offset: "0%", "stop-color": "#ff5500", "stop-opacity": "1" }),
                    React.createElement("stop", { offset: "100%", "stop-color": "#ff2200", "stop-opacity": "1" }))),
            React.createElement("a", { id: "toggle-play", onClick: this.togglePlay, style: togglePlayStyle },
                React.createElement("circle", { cx: "48%", cy: "89%", r: "10", fill: "url(#pause-play-gradient)", stroke: "black" }),
                React.createElement("circle", { id: "circle-pause", cx: "48%", cy: "89%", r: "10", stroke: "#cc4400", fill: "transparent" }),
                this.renderIcons())));
    };
    // // @ts-ignore
    // static propTypes: {
    //   // @ts-ignore
    //   radius: PropTypes.number,
    //   autoplay: PropTypes.bool,
    //   timer_remaining_id: PropTypes.string,
    //   onTogglePlay: PropTypes.func,
    //   onComplete: PropTypes.func,
    //   minutes: PropTypes.number,
    //   seconds: PropTypes.number,
    //   warning_threshold: PropTypes.number
    // }
    CountdownTimer.defaultProps = {
        radius: RADIUS,
        timer_remaining_id: TIMER_REMAINING_ID,
        warning_threshold: WARNING_THRESHOLD
    };
    return CountdownTimer;
}(React.Component));

exports.CountdownTimer = CountdownTimer;
//# sourceMappingURL=index.js.map
