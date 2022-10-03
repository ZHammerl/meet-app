import React, { Component } from 'react';
import './numberOfEvents.css';
import { ErrorAlert } from '../Alert/Alert';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: '',
    errorText: '',
  };

  handleInputChange = (event) => {
    const eventCount = event.target.value;
    console.log(eventCount);
    if (eventCount < 1 || eventCount > 32) {
      this.setState({
        errorText:
          'Please select a number between 1 and 32',
      });
    } else {
      this.props.updateEvents(undefined, eventCount);
      this.setState({
        errorText: '',
      });
    }
  };

  render() {
    return (
      <div className="NumberOfEvents">
        <label
          className="number-label"
          htmlFor="number-input">
          Number of Events to display:
        </label>
        <input
          type="number"
          min="0"
          max="100"
          className="number number-input"
          value={this.props.numberOfEvents}
          // onChange={this.handleInputChange}
        />
        <ErrorAlert text={this.state.errorText} />
      </div>
    );
  }
}

export default NumberOfEvents;
