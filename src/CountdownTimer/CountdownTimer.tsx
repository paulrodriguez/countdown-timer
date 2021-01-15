import * as React from 'react';

import './main.scss';

const RADIUS = 35;
const TIMER_REMAINING_ID='base-timer-path-remaining';
const WARNING_THRESHOLD = 0.5;
const SECS_PER_MIN = 60;


interface CountdownTimerProps {
  minutes: number|string,
  seconds: number|string,
  radius?: number,
  timer_remaining_id?: string,
  warning_threshold?: number,
  width?:number,
  height?:number,
  autplay?: boolean,
  onTogglePlay?: (isPaused: boolean, isActive: boolean) => void,
  onTick?: (deltaTime: number)=>void,
  onComplete?: ()=>void | [boolean, number, number],
  direction?: "left" | "right"
};

/**
 * for now, use any type for props and state
 */
class CountdownTimer extends React.Component<CountdownTimerProps, any> {

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
      const [restart=false, minutes=0, seconds=0] = this.props.onComplete();

      if(restart) {
        this.startTimer(minutes, seconds);
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


  togglePlay(): void {
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


  }

  getMinutesSeconds(location: string): number[] {
    if(location == 'props') {
      const minutes = (isNaN(this.props.minutes) || this.props.minutes=="" || this.props.minutes == null) ? 0 : parseInt(this.props.minutes);

      const seconds = (isNaN(this.props.seconds) || this.props.seconds=="" || this.props.seconds == null) ? 0 : parseInt(this.props.seconds);

      return [minutes, seconds];
    }

    if(location == 'state') {
      const minutes = (isNaN(this.state.minutes) || this.state.minutes=="" || this.state.minutes == null) ? 0 : parseInt(this.state.minutes);

      const seconds = (isNaN(this.state.seconds) || this.state.seconds=="" || this.state.seconds == null) ? 0 : parseInt(this.state.seconds);

      return [minutes, seconds];
    }
  }
  startTimer(minutes, seconds): void {
    const newMinutes = (isNaN(minutes) || minutes=="" || minutes == null) ? 0 : parseInt(minutes);

    const newSeconds = (isNaN(seconds) || seconds=="" || seconds == null) ? 0 : parseInt(seconds);

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

    return this.props.minutes;
  }

  getSeconds(): number {
    if(this.state.active) {
      return this.state.seconds;
    }

    return this.props.seconds;
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

  getTimeFraction(): number {
    const timeFraction = this.state.currentTimeInSeconds/this.state.timeLimit;

    return timeFraction - (1 / this.state.timeLimit) * (1 - timeFraction)
  }

  getRemaining(): number {
    return Math.max(this.getTimeFraction() * this.getCircumference(), 0);
  }

  getDashArray(): number[] {
    const circumference = this.getCircumference();

    if(!this.state.active) {
      return [-1, circumference];
    }


    return [this.getRemaining(), circumference];
  }

  renderIcons(): any {
    if(this.state.active && !this.state.paused) {
      return (
        <g id="pause-icon" stroke="white" strokeWidth="1">
         <rect x="45%" y="85%" width="1" height="10" />
         <rect x="50%" y="85%" width="1" height="10" />
        </g>
       );
    }

    if(!this.state.active || this.state.paused) {
      return (
         <g id="play-icon" stroke="white" fill="white">
          <polygon points="47,110 53,115 47,120" />
         </g>
      );
    }
  }

  strokeClass(): string {
    if(!this.state.active) {
      return 'stroke-active';
    }

    if(this.state.currentTimeInSeconds/this.state.timeLimit <= this.props.warning_threshold) {
      return 'stroke-warning';
    }
    //
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
           <text x="28%" y="55%" id="timer-value">{this.pad(this.getMinutes())}:{this.pad(this.getSeconds())}</text>
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
