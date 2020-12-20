const { Component } = React;

const RADIUS = 35;
const TIMER_REMAINING_ID='base-timer-path-remaining';
const WARNING_THRESHOLD = 0.5;

class CountdownTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radius:RADIUS,
      id: TIMER_REMAINING_ID,
      active: false,
      paused: false,
      interval: null
    }

    this.togglePlay = this.togglePlay.bind(this);
    this.animateClass = this.animateClass.bind(this);
  }

    componentDidUpdate(prevProps, prevState) {
      if(this.state.active) {
        return;
      }


      if(this.props.play) {
        this.startTimer();
      }
    }

  onComplete(): void {
    this.setState({active: false, paused: false});
    clearInterval(this.state.interval);
    if(this.props.onComplete) {
      this.props.onComplete();
    }
  }

    pad(number): string {
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
    return  circum.toFixed(0);
  }

  togglePlay(): void {
    if(!this.state.active) {
      this.startTimer();
      return;
    }

    this.setState({paused: !this.state.paused});

    if(this.props.togglePlay) {
      this.props.togglePlay(this.state.paused);
    }
  }

  startTimer(): void {
    const minutes = (isNaN(this.props.minutes) || this.props.minutes=="" || this.props.minutes == null) ? 0 : parseInt(this.props.minutes);

      const seconds = (isNaN(this.props.seconds) || this.props.seconds=="" || this.props.seconds == null) ? 0 : parseInt(this.props.seconds);

    this.setState({minutes: minutes, seconds: seconds});

    const totalTime = minutes*60+seconds;

    this.setState({currentTimeInSeconds: totalTime});
    this.setState({timeLimit: totalTime});
    this.setState({active: true});

    this.setState({interval: setInterval(this.decrease.bind(this), 1000)});
  }

  getMinutes() {
    if(this.state.active) {
      return this.state.minutes;
    }

    return this.props.minutes;
  }

  getSeconds() {
    if(this.state.active) {
      return this.state.seconds;
    }

    return this.props.seconds;
  }

  decrease(): void {
    if(this.state.paused) {
      return;
    }

    if(this.state.currentTimeInSeconds<=0) {
      this.onComplete();
      return;
    }

    const timeInSeconds = this.state.currentTimeInSeconds-1;
    this.setState({currentTimeInSeconds: timeInSeconds});

    if(this.state.seconds > 0) {
      this.setState({seconds: this.state.seconds-1});
    } else {
      this.setState({seconds: 59});
      this.setState({minutes: this.state.minutes-1});
    }
  }

  getTimeFraction(): number {
    const timeFraction = this.state.currentTimeInSeconds/this.state.timeLimit;

    return timeFraction - (1 / this.state.timeLimit) * (1 - timeFraction)
  }

  getRemaining(): number {
    return Math.max(this.getTimeFraction() * this.getCircumference(), 0);
  }

  getDashArray(): string {
    const circumference = this.getCircumference();
    if(!this.state.active) {
      return circumference + " " + circumference;
    }
    return this.getRemaining() + " " + this.getCircumference();
  }

  renderIcons() {
    if(this.state.active && !this.state.paused) {
      return (
        <g id="pause-icon" stroke="white" stroke-width="1">
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

  animateClass(): string {
    if(!this.state.active) {
      return '';
    }

    return 'timer-animate';
  }


  strokeClass(): void {
    if(!this.state.active) {
      return 'stroke-active';
    }

    if(this.state.currentTimeInSeconds/this.state.timeLimit <= 0.5) {
      return 'stroke-warning';
    }

    return 'stroke-active';
  }

  render() {
    return (
      <svg viewBox="0 0 100 130" height="300" width="300" xmlns="http://www.w3.org/2000/svg">
  <g className={"base-timer__circle"} id="base-timer-circle-group">
    <circle cx="50%" cy="50%" r="35" fill="white" stroke="gray" stroke-width="2" stroke-dasharray="0" id="base-timer-path-empty" />

     <circle cx="50%" cy="50%"   r={this.state.radius}
            id={this.state.id}
            className={"base-timer__path-remaining " + this.animateClass() + " " + this.strokeClass()}
            fill="transparent" stroke-width="2" stroke-dasharray={this.getDashArray()} />
             <text x="28%" y="55%" id="timer-value">{this.pad(this.getMinutes())}:{this.pad(this.getSeconds())}</text>
      </g>
      <defs>
    <linearGradient id="pause-play-gradient" x1="0%" y1="0%" x2="0%" y2="100%" spreadMethod="pad">
      <stop offset="0%" stop-color="#ff5500" stop-opacity="1"></stop>
      <stop offset="100%" stop-color="#ff2200" stop-opacity="1"></stop>
    </linearGradient>
  </defs>
  <a id="toggle-play" onClick={this.togglePlay} style={{'margin-left':'4px'}}>
     <circle cx="48%" cy="89%" r="10" fill="url(#pause-play-gradient)" stroke="black" />
  <circle id="circle-pause" cx="48%" cy="89%" r="10" stroke="#cc4400" fill="transparent" />
   {this.renderIcons()}
  </a>
      </svg>
    );
  }
}

export default CountdownTimer;
