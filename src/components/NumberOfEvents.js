import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: '',
  };
  handleInputChange = (event) => {
    const eventCount = event.target.value;
    this.props.updateEvents(undefined, eventCount);
  };
  render() {
    return (
      <div className="NumberOfEvents">
        <label className="number-label">
          Number of Events to display:
        </label>
        <input
          type="number"
          className="number number-input"
          value={this.props.numberOfEvents}
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}

export default NumberOfEvents;
