import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: '',
  };
  handleInputChange = (event) => {
    const numberValue = event.target.value;
    this.props.updateEvents(undefined, numberValue);
  };
  render() {
    return (
      <div className="numberOfEvents">
        <label className="number-label">
          Number of Events to display:
          <input
            type="number"
            className="number number-input"
            value={this.props.numberOfEvents}
            onChange={this.handleInputChange}
          />
        </label>
      </div>
    );
  }
}

export default NumberOfEvents;
