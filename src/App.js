import React, { Component } from 'react';
import './App.css';
import EventList from './components/EventList/EventList';
import CitySearch from './components/CitySearch/CitySearch';
import { extractLocations, getEvents } from './api';
import NumberOfEvents from './components/NumberOfEvents/NumberOfEvents';
import { Header } from './components/Header/Header';

import { OfflineAlert } from './components/Alert/Alert';

class App extends Component {
  state = {
    events: [],
    locations: [],
    locationSelected: 'all',
    numberOfEvents: '20',
  };

  componentDidMount() {
    //make sure it is mounted before populating the state
    this.mounted = true;
    const defaultNumber = this.state.numberOfEvents;
    getEvents().then((events) => {
      this.setState({
        events: events.slice(0, defaultNumber),
        locations: extractLocations(events),
      });
    });
    if (!navigator.onLine) {
      this.setState({
        offlineText:
          "Your're offline! The data was loaded from the cache.",
      });
    } else {
      this.setState({
        offlineText: '',
      });
    }
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
      console.log(locationEvents);
      console.log(eventCount);
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
        <Header />
        <div className="city-number">
          <CitySearch
            locations={this.state.locations}
            updateEvents={this.updateEvents}
          />
          <NumberOfEvents
            updateEvents={this.updateEvents}
            numberOfEvents={this.state.numberOfEvents}
          />
        </div>
        <OfflineAlert text={offlineText} />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
