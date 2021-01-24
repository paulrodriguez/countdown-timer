import * as React from 'react';
import SvgPause from '../SvgPause';

import './main.scss';

// @TODO move into their own file
const RADIUS = 35;
const TIMER_REMAINING_ID='base-timer-path-remaining';
const WARNING_THRESHOLD = 0.5;
const SECS_PER_MIN = 60;

type CustomTuple = [boolean, number, number];

interface CountdownTimerProps {
  minutes: number|string,
  seconds: number|string,
  radius?: number,
  timer_remaining_id?: string,
  warning_threshold?: number,
  width?:number,
  height?:number,
  autoplay?: boolean,
  onTogglePlay?: (isPaused: boolean, isActive: boolean) => void,
  onTick?: (deltaTime: number)=>void,
  onComplete?: () => (void|CustomTuple),
  direction?: "left"|"right"
}

/**
 * CountdownTimer class
 */
class CountdownTimer extends React.Component<CountdownTimerProps, any> {

  /**
   * default props
   */
  static defaultProps = {
    radius: RADIUS,
    timer_remaining_id: TIMER_REMAINING_ID,
    warning_threshold: WARNING_THRESHOLD,
    width: 300,
    height: 300,
    autoplay: false,
    direction: "left"
  }

  constructor(props: any) {
    super(props);
    this.state = {
      radius:props.radius,
      id: props.timer_remaining_id,
      active: false,
      paused: false,
      prevTime: null
    }

    this.togglePlay = this.togglePlay.bind(this);
    this.tick = this.tick.bind(this);
    this.updateTime = this.updateTime.bind(this);
  }

  componentWillUnmount() {
    if(this.state.interval) {
      clearInterval(this.state.interval);
    }
  }

  componentDidMount() {
    if(this.props.autoplay) {
      this.startTimer(this.props.minutes, this.props.seconds);
    }
  }


  onComplete(): void {
    this.setState({active: false, paused: false, prevTime: null});


    if(this.props.onComplete) {
      const values = this.props.onComplete();

      if(Array.isArray(values)) {
        const [restart=false, minutes=0, seconds=0] = values;

        if(restart) {
          this.startTimer(minutes, seconds);
        }
      }
    }
  }

    pad(number: number): string|number {
      if(number == null) {
        return '00';
      }

      if(number <= 9 && number>=0) {
        return '0'+number;
      }

      return number;
    }

  getCircumference(): number {
    const circum = 2*Math.PI*this.state.radius;
    return  Number(circum.toFixed(0));
  }


  togglePlay(): undefined {
    if(!this.state.active) {
      if(this.props.onTogglePlay) {
        this.props.onTogglePlay(this.state.paused, this.state.active);
      }

      this.startTimer(this.props.minutes, this.props.seconds);
      return;
    }

    this.setState({
      paused: !this.state.paused},
      () => {
        if(this.props.onTogglePlay) {
          this.props.onTogglePlay(this.state.paused, this.state.active);
        }
      }
    );

    return;
  }


  startTimer(minutes: number|string, seconds: number|string): void {

    let newMinutes = 0;

    if(typeof minutes==="number" || (typeof minutes === "string" && !Number.isNaN(minutes))) {
      newMinutes = Number(minutes);
    }

    let newSeconds = 0;
    if(typeof seconds==="number" || (typeof seconds === "string" && !Number.isNaN(seconds))) {
      newSeconds = Number(seconds);
    }

    this.setState({minutes: newMinutes, seconds: newSeconds});


    const totalTime = newMinutes*SECS_PER_MIN+newSeconds;

    this.setState({
      currentTimeInSeconds: totalTime,
      timeLimit: totalTime,
      active: true}, () => {
        requestAnimationFrame(this.tick);
    });
  }

  getMinutes(): number {
    if(this.state.active) {
      return this.state.minutes;
    }

    return Number(this.props.minutes);
  }

  getSeconds(): number {
    if(this.state.active) {
      return this.state.seconds;
    }

    return Number(this.props.seconds);
  }

  tick(time: any) {
    if(this.state.prevTime == null) {
      this.setState({prevTime: time});

      requestAnimationFrame(this.tick);

      return;
    }

    const delta = time - this.state.prevTime;

    this.setState({prevTime: time});


    if(this.state.paused) {
      requestAnimationFrame(this.tick);
      return;
    }

    const timeInSeconds = this.state.currentTimeInSeconds - delta/1000;

    this.setState({currentTimeInSeconds: timeInSeconds});

    if(this.props.onTick) {
      this.props.onTick(delta/1000);
    }

    if(timeInSeconds < 0) {
      this.onComplete();
      return;
    }

    this.updateTime(timeInSeconds);

    requestAnimationFrame(this.tick);
  }

  /**
   * update the minutes and seconds based on time given in seconds
   *
   * @param {Number} time
   * @return void
   */
  updateTime(time: any) {
    const minutes = Math.floor(time/60);
    const seconds = Math.floor(time%60);

    this.setState({minutes: minutes, seconds: seconds});
  }

  /**
   * get the time fraction between total time and remaining time
   */
  getTimeFraction(): number {
    const timeFraction = this.state.currentTimeInSeconds/this.state.timeLimit;

    return timeFraction - (1 / this.state.timeLimit) * (1 - timeFraction)
  }

  /**
   * get size of circle for remaining time based on tiem fraction
   */
  getRemaining(): number {
    return Math.max(this.getTimeFraction() * this.getCircumference(), 0);
  }

  getDashArray(): string {
    const circumference = this.getCircumference();

    if(!this.state.active) {
      return `-1 ${circumference}`;
    }

    return `${this.getRemaining()} ${circumference}`;
  }

  /**
   * format of text inside circle
   */
  format(): string {
    return `${this.pad(this.getMinutes())}:${this.pad(this.getSeconds())}`;
  }


  renderIcons(): any {
    if(this.state.active && !this.state.paused) {
      return (<SvgPause />);
      /*return (
        <g id="pause-icon" stroke="white" strokeWidth="1">
         <rect x="45%" y="85%" width="1" height="10" />
         <rect x="50%" y="85%" width="1" height="10" />
        </g>
      );*/
    }

    if(!this.state.active || this.state.paused) {
      return (
         <g id="play-icon" stroke="white" fill="white">
          <polygon points="45.5,110.5 52.5,115.5 45.5,120.5" />
         </g>
      );
    }
  }

  strokeClass(): string {
    if(!this.state.active) {
      return 'stroke-active';
    }

    const threshold: number = this.props.warning_threshold || WARNING_THRESHOLD;

    if(this.state.currentTimeInSeconds/this.state.timeLimit <= threshold) {
      return 'stroke-warning';
    }

    return 'stroke-active';
  }

  directionClass(): string {
    if(this.props.direction == 'left') {
      return 'dir-counterclockwise';
    } else if(this.props.direction == 'right') {
      return "dir-clockwise";
    } else {
      return 'dir-counterclockwise';
    }
  }

  render() {
    const togglePlayStyle = {'marginLeft':'4px'} as React.CSSProperties;
    const circlePathClasses = "base-timer__path-remaining dir-counterclockwise animate-stroke "
      + this.directionClass()+ " " + this.strokeClass();

    return (
      <svg viewBox="0 0 100 130" height={this.props.height}
        width={this.props.width} xmlns="http://www.w3.org/2000/svg">
        <g className={"base-timer__circle"} id="base-timer-circle-group">
          <circle cx="50%" cy="50%" r="35" fill="white" stroke="gray"
            strokeWidth="2" strokeDasharray="0" id="base-timer-path-empty" />

          <circle cx="50%" cy="50%"   r={this.state.radius}
            id={this.state.id}
            className={circlePathClasses}
            fill="transparent" strokeWidth="2" strokeDasharray={this.getDashArray()} />
           <text x="28%" y="55%" id="timer-value">{this.format()}</text>
        </g>
        <defs>
          <linearGradient id="pause-play-gradient" x1="0%" y1="0%" x2="0%" y2="100%" spreadMethod="pad">
            <stop offset="0%" stopColor="#ff5500" stopOpacity="1"></stop>
            <stop offset="100%" stopColor="#ff2200" stopOpacity="1"></stop>
          </linearGradient>
        </defs>
        <a id="toggle-play" onClick={this.togglePlay} style={togglePlayStyle}>
           <circle cx="48%" cy="89%" r="10" fill="url(#pause-play-gradient)" stroke="black" />
           <circle id="circle-pause" cx="48%" cy="89%" r="10" stroke="#cc4400" fill="transparent" />
           {this.renderIcons()}
        </a>
      </svg>
    );
  }
}

export default CountdownTimer;
