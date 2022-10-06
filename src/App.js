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
    const accessToken = localStorage.getItem(
      'access_token'
    );
    let isTokenValid;
    if (accessToken && !navigator.onLine) {
      isTokenValid = true;
    } else {
      isTokenValid = (await checkToken(accessToken)).error
        ? false
        : true;
    }
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

  getData =()=>{
    const {locations, events} =this.state;
    const data = locations.map((location)=>{
      const number = events.filter((event)=> event.location === location).length
      const city = location.split(', ').shift()
      return {city, number}
    })
    return data
  }
  render() {
    const {
      locations,
      numberOfEvents,
      events,
      offlineText,
      showWelcomeScreen,
    } = this.state;
    console.log(showWelcomeScreen);
    if (showWelcomeScreen === undefined)
      return <div className="App" />;
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
