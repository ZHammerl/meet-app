import React, { Component } from 'react';
import './App.css';
import EventList from './components/EventList/EventList';
import CitySearch from './components/CitySearch/CitySearch';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import NumberOfEvents from './components/NumberOfEvents/NumberOfEvents';
import ScatterChartView from './components/ScatterChartView/ScatterChartView';
import { Header } from './components/Header/Header';
import { OfflineAlert } from './components/Alert/Alert';
import {
  extractLocations,
  getEvents,
  checkToken,
  getAccessToken,
} from './api';

import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';

class App extends Component {
  state = {
    events: [],
    locations: [],
    locationSelected: 'all',
    numberOfEvents: '20',
    offlineText: '',
    showWelcomeScreen: undefined,
  };

  // componentDidMount() {
  //   //make sure it is mounted before populating the state
  //   this.mounted = true;
  //   const defaultEventNumber = this.state.numberOfEvents;
  //   getEvents().then((events) => {
  //     this.setState({
  //       events: events.slice(0, defaultEventNumber),
  //       locations: extractLocations(events),
  //     });
  //   });
  //   if (!navigator.onLine) {
  //     console.log('offline');
  //     this.setState({
  //       offlineText:
  //         "Your're offline, so events may not be up to date",
  //     });
  //   } else {
  //     this.setState({
  //       offlineText: '',
  //     });
  //   }
  // }

  async componentDidMount() {
    this.mounted = true;
    /**
     * if localhost => show EventList with mockData
     * if offline =>
     * - show EventList with entries from local storage
     * - hide WelcomeScreen
     * if logged in =>
     *  - hide WelcomeScreen
     *  - fetch events
     *  - show EventList
     * Else (not local, not offline, not logged in) => show WelcomeScreen
     */

    const isLocalHost = window.location.href.startsWith(
      'http://localhost'
    );
    const isOffline = !navigator.onLine;

    if (isLocalHost) {
      this.hideWelcomeScreen();
      this.fetchEvents();
      console.log('islocalhost');
      return;
    }
    if (isOffline) {
      this.setState({
        offlineText:
          "Your're offline, so events may not be up to date",
      });
      this.hideWelcomeScreen();
      this.fetchEvents();
    } else {
      const accessToken = localStorage.getItem(
        'access_token'
      );
      const isLoggedIn = !(await checkToken(accessToken))
        .error;
      const searchParams = new URLSearchParams(
        window.location.search
      );
      const code = searchParams.get('code');
      if (isLoggedIn || code) {
        this.hideWelcomeScreen();
        this.fetchEvents();
      } else {
        this.setState({
          showWelcomeScreen: true,
        });
        console.log('hello');
      }
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  fetchEvents() {
    getEvents().then((events) => {
      if (this.mounted) {
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

  hideWelcomeScreen() {
    this.setState({
      showWelcomeScreen: false,
    });
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
  getData() {
    const { events, locations } = this.state;

    const data = locations.map((location) => {
      const number = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(', ').shift();
      return { city, number };
    });
    return data;
  }

  render() {
    const {
      locations,
      numberOfEvents,
      events,
      offlineText,
      showWelcomeScreen,
    } = this.state;
    console.log(locations);
    console.log(showWelcomeScreen);
    return (
      <div className="App">
        <Header />
        {!showWelcomeScreen && (
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
        )}
        <OfflineAlert text={offlineText} />
        <ErrorBoundary>
          <ScatterChartView data={this.getData()} />
        </ErrorBoundary>

        {!showWelcomeScreen && (
          <EventList events={events} />
        )}
        {showWelcomeScreen && (
          <WelcomeScreen
            getAccessToken={() => {
              getAccessToken();
            }}
          />
        )}
      </div>
    );
  }
}

export default App;
