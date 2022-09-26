import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    numOfEvents: 32,
  };

  handleInputChange = (event) => {
    const { value } = event.target;
    this.setState({ numOfEvents: value });
  };
  render() {
    return (
      <div className="number-of-events">
        <label>
          <input
            type="number"
            className="number-input"
            value={this.state.numOfEvents}
            onChange={this.handleInputChange}
          />
        </label>
      </div>
    );
  }
}

export default NumberOfEvents;
