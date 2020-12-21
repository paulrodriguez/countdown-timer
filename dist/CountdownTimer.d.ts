import * as React from 'react';
declare class CountdownTimer extends React.Component<any, any> {
    static defaultProps: {
        radius: number;
        timer_remaining_id: string;
        warning_threshold: number;
    };
    constructor(props: any);
    componentWillUnmount(): void;
    componentDidUpdate(): void;
    onComplete(): void;
    pad(number: number): string | number;
    getCircumference(): number;
    toggleAnimate(): undefined;
    togglePlay(): void;
    startTimer(): void;
    getMinutes(): number;
    getSeconds(): number;
    decrease(): void;
    getTimeFraction(): number;
    getRemaining(): number;
    getDashArray(): string;
    renderIcons(): any;
    animateClass(): string;
    strokeClass(): string;
    render(): JSX.Element;
}
export default CountdownTimer;
