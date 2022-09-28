import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import { extractLocations, getEvents } from './api';
import NumberOfEvents from './NumberOfEvents';

class App extends Component {
  state = {
    events: [],
    locations: [],
    locationSelected: 'all',
    numberOfEvents: 20,
  };

  componentDidMount() {
    //make sure it is mounted before populating the state
    this.mounted = true;
    getEvents().then((events) => {
      this.setState({
        events,
        locations: extractLocations(events),
      });
    });
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  updateEvents = (location, eventCount) => {
    if (eventCount === undefined) {
      eventCount = this.state.numberOfEvents;
    } else this.setState({ numberOfEvents: eventCount });
    if (location === undefined) {
      location = this.state.locationSelected;
    }
    getEvents().then((events) => {
      const locationEvents =
        location === 'all'
          ? events
          : events.filter(
              (event) => event.location === location
            );
      this.setState({
        events: locationEvents.slice(0, eventCount),
        numberOfEvents: eventCount,
        locationSelected: location,
      });
    });
  };
  render() {
    // const events = mockData;
    return (
      <div className="App">
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents
          updateEvents={this.updateEvents}
          numberOfEvents={this.state.numberOfEvents}
        />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
