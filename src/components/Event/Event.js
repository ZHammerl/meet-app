import React, { Component } from 'react';
import './event.css';
import { BsCalendarEvent } from 'react-icons/bs';
import { BiTimeFive } from 'react-icons/bi';
import { IoLocationOutline } from 'react-icons/io5';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  toggleEventDetails = () => {
    this.setState({ show: !this.state.show });
  };

  localDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      dateStyle: 'medium',
    });
  };

  localTime = (date) => {
    return new Date(date).toLocaleTimeString().slice(0, -3);
  };

  render() {
    const { event } = this.props;
    return (
      <div className="event">
        <h2 className="event-title">{event.summary}</h2>
        <div className="dateTime">
          <b>
            <BsCalendarEvent className="icons" />
            &nbsp;{this.localDate(event.start.dateTime)}
          </b>
          <br />
          <b>
            <BiTimeFive className="icons" />
            &nbsp;{this.localTime(
              event.start.dateTime
            )}{' '}
          </b>
          ({event.start.timeZone})
        </div>
        <b className="location-detail">
          <IoLocationOutline className="icons" />
          &nbsp;{event.location}
        </b>
        {this.state.show && (
          <div className="details-container">
            <h4 className="event-about">
              About the event:
            </h4>
            <a
              href={event.htmlLink}
              target="_blank"
              rel="noopener noreferrer"
              className="event-link">
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
