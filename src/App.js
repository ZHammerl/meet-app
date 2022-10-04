import React, { Component } from 'react';
import './App.css';
import EventList from './components/EventList/EventList';
import CitySearch from './components/CitySearch/CitySearch';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import NumberOfEvents from './components/NumberOfEvents/NumberOfEvents';
import { Header } from './components/Header/Header';
import {
  extractLocations,
  getEvents,
  checkToken,
  getAccessToken,
} from './api';

import { OfflineAlert } from './components/Alert/Alert';

class App extends Component {
  state = {
    events: [],
    locations: [],
    locationSelected: 'all',
    numberOfEvents: '20',
    showWelcomeScreen: undefined,
  };

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem(
      'access_token'
    );
    const isTokenValid = (await checkToken(accessToken))
      .error
      ? false
      : true;
    const searchParams = new URLSearchParams(
      window.location.search
    );
    const code = searchParams.get('code');
    this.setState({
      showWelcomeScreen: !(code || isTokenValid),
    });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          console.log('getEvents');
          this.setState({
            events: events.slice(
              0,
              this.state.numberOfEvents
            ),
            locations: extractLocations(events),
          });
        }
      });
    }

    if (!navigator.onLine) {
      console.log('offline');
      this.setState({
        offlineText:
          "Your're offline, so events may not be up to date",
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
    const {
      locations,
      numberOfEvents,
      events,
      offlineText,
    } = this.state;
    if (this.state.showWelcomeScreen === undefined)
      return <div className="App" />;
    return (
      <div className="App">
        <Header />
        <div className="city-number">
          <CitySearch
            locations={locations}
            updateEvents={this.updateEvents}
          />
          <NumberOfEvents
            updateEvents={this.updateEvents}
            numberOfEvents={numberOfEvents}
          />
        </div>
        <OfflineAlert text={offlineText} />
        {!navigator.onLine && (
          <OfflineAlert
            text={
              'You are offline, so events may not be up to date'
            }
          />
        )}
        <EventList events={events} />
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
      </div>
    );
  }
}

export default App;
