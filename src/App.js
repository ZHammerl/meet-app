import React from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import { mockData } from './mock-data';
import NumberOfEvents from './NumberOfEvents';

function App() {
  const events = mockData;
  return (
    <div className="App">
      <CitySearch />
      <NumberOfEvents />
      <EventList events={events} />
    </div>
  );
}

export default App;
