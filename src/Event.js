import React, { Component } from 'react';

class Event extends Component {
  state = {
    show: false,
  };

  toggleEventDetails = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    const { event } = this.props;
    return (
      <div>
        <h2 className="event-title">{event.summary}</h2>
        <p className="dateTime">
          {event.start.dateTime} {event.start.timeZone}
        </p>
        <p className="location">{event.location}</p>
        {this.state.show && (
          <div className="details-container">
            <h4 className="event-about">About event:</h4>
            <a href={event.htmlLink} className="event-link">
              See details on Google Calendar
            </a>
            <p className="description">
              {event.description}
            </p>
          </div>
        )}
        <button
          className="details-btn"
          onClick={this.toggleEventDetails}>
          {!this.state.show
            ? 'Show Details'
            : 'Hide Details'}
        </button>
      </div>
    );
  }
}

export default Event;
