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
  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents =
        location === 'all'
          ? events
          : events.filter(
              (event) => event.location === location
            );
      this.setState({
        events: locationEvents,
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
        <NumberOfEvents />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
