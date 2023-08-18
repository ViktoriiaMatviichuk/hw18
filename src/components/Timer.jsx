import React from "react"

import './Timer.css';

   export class Timer extends React.Component {
      constructor(props) {
        super(props);
    
        this.state = {
          initial: 10000,
          value: 10000,
          step: 1000,
          timerWorking: false
        };
        
        this.intervalRef = React.createRef();
      }

      componentDidMount() {
        this.startTimer()
      }

      startTimer = () => {
        this.setState(() => ({
            timerWorking: true
          }));
        
        this.intervalRef.current = setInterval(() => {
            if (this.state.value > 0) {
              this.setState((prevState) => ({
                value: prevState.value - 1
              }));
            } else {
              this.clearTimer();
            }
          }, this.state.step);
      };

      componentWillUnmount() {
        this.clearTimer();
      }
    
      clearTimer = () => {
        clearInterval(this.intervalRef.current);
      };

      pauseTimer = () => {
        this.clearTimer();
        this.setState(() => ({
            timerWorking: false
          }));
      };
      
      setInitialTime = (e) => {
        this.setState(() => ({
            initial: e.target.value
          }));
      };

      startTimerWithNewSetup = () => {
        this.clearTimer();
        this.setState(() => ({
            value: this.state.initial
        }));
        this.startTimer()
      };



      setTimerStep = (e) => {
        this.setState(() => ({
            step: e.target.value
          }));
      };
    
      render() {
        
        return (
          <div className="wrapper">
            Countdown Timer
            <div className="timer-settings">
                INITIAL TIME
                <input type="number" value= {this.state.initial} onChange={this.setInitialTime}/>
            </div>
            <div className="timer-settings">
                STEP e.g. 1000=1second
                <input type="number" value= {this.state.step} onChange={this.setTimerStep}/>
            </div>
            <button onClick={this.startTimerWithNewSetup}>START</button>
            <p className="timer"> {this.state.value}</p>
            <div>
               
                <button onClick={this.state.timerWorking
                   ? this.pauseTimer
                   : this.startTimer
                }>
                    {this.state.timerWorking
                        ? "PAUSE"
                        : "RESUME"
                    }
                </button>
            </div>
          </div>
        );
      }
    }
    
