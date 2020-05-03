import React, { Component } from 'react';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from 'react-step-progress-bar';
import PropTypes from 'prop-types';
import axios from 'axios';
import one from 'assets/img/numbers/one.svg';
import two from 'assets/img/numbers/two.svg';
import three from 'assets/img/numbers/three.svg';
import four from 'assets/img/numbers/four.svg';
import five from 'assets/img/numbers/five.svg';

const propTypes = {
  id: PropTypes.string,
  percent: PropTypes.number
};

class StatusBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{
        id: '',
        step_name: ''
      }]
    }
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.id !== prevProps.id) {
      this.getData();
    }
  }

  getData = () => {
    axios.get(process.env.REACT_APP_API_PATH + '/cal_steps/reference/' + this.props.id.replace(new RegExp("/", 'g'), "%2F"))
      .then(res => {
        this.setState({ data: res.data });
      })
      .catch(error => {
        this.setState({
          data: [{
            id: '',
            step_name: ''
          }]
        });
      });
  }

  render() {

    const { percent } = this.props;

    const stepProgress = {
      margin: "2% 20% 5% 20%"
    }

    const trackBar = {
      display: "flex",
      margin: "0 12.5%",
    }

    const trackStatus = {
      width: "20%",
      textAlign: "center",
      marginTop: "-3%",
      marginBottom: "3%"
    }

    return (
      <React.Fragment>
        <div style={stepProgress}>
          <ProgressBar
            percent={percent}
            filledBackground="linear-gradient(to right, #E3E9ED, #2F353A)"
            height={15}
          >
            <Step transition="scale">
              {({ accomplished }) => (
                <img
                  style={{ filter: `grayscale(${accomplished ? 0 : 100}%)`, backgroundColor: "whitesmoke" }}
                  width="50"
                  src={one}
                  alt="step 1"
                />
              )}
            </Step>
            <Step transition="scale">
              {({ accomplished }) => (
                <img
                  style={{ filter: `grayscale(${accomplished ? 0 : 100}%)`, backgroundColor: "whitesmoke" }}
                  width="50"
                  src={two}
                  alt="step 2"
                />
              )}
            </Step>
            <Step transition="scale">
              {({ accomplished }) => (
                <img
                  style={{ filter: `grayscale(${accomplished ? 0 : 100}%)`, backgroundColor: "whitesmoke" }}
                  width="50"
                  src={three}
                  alt="step 3"
                />
              )}
            </Step>
            <Step transition="scale">
              {({ accomplished }) => (
                <img
                  style={{ filter: `grayscale(${accomplished ? 0 : 100}%)`, backgroundColor: "whitesmoke" }}
                  width="50"
                  src={four}
                  alt="step 4"
                />
              )}
            </Step>
            <Step transition="scale">
              {({ accomplished }) => (
                <img
                  style={{ filter: `grayscale(${accomplished ? 0 : 100}%)`, backgroundColor: "whitesmoke" }}
                  width="50"
                  src={five}
                  alt="step 5"
                />
              )}
            </Step>
          </ProgressBar>
        </div>
        <div style={trackBar}>
          {this.state.data[0].id ?
            this.state.data.map((item, i) =>
              <h5 style={trackStatus} key={item.id}>{item.step_name}</h5>
            ) : "-"
          }
        </div>
      </React.Fragment>
    );
  }
}

StatusBar.propTypes = propTypes;

export default StatusBar;