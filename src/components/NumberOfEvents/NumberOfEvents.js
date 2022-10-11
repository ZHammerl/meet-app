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
    const { numberOfEvents } = this.props;
    return (
      <div className="NumberOfEvents">
        <label
          className="number-label"
          htmlFor="number-input">
          Number of Events
        </label>
        <input
          type="number"
          id="number-input"
          className="number number-input"
          value={numberOfEvents}
          onChange={this.handleInputChange}
        />
        <ErrorAlert text={this.state.errorText} />
      </div>
    );
  }
}

export default NumberOfEvents;
