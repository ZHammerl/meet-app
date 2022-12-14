import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../components/EventList';
import CitySearch from '../components/CitySearch';
import NumberOfEvents from '../components/NumberOfEvents';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';

// Unit tests
describe('<App /> component', () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test('render list of events', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('render CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test('render NumberOfEvents', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});

// Integration test
describe('<App/> integration', () => {
  test('App passes "events" as a prop to EventList', () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state('events');
    expect(AppEventsState).not.toEqual(undefined);
    expect(
      AppWrapper.find(EventList).props().events
    ).toEqual(AppEventsState);
    AppWrapper.unmount();
  });

  test('App passes "locations" state as prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state('locations');
    expect(AppLocationsState).not.toEqual(undefined);
    expect(
      AppWrapper.find(CitySearch).props().locations
    ).toEqual(AppLocationsState);
    AppWrapper.unmount();
  });

  test('Get list of events matching the city selected by the user', async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions =
      CitySearchWrapper.state('suggestions');
    const selectedIndex = Math.floor(
      Math.random() * suggestions.length
    );
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(
      selectedCity
    );
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(
      (event) => event.location === selectedCity
    );
    expect(AppWrapper.state('events')).toEqual(
      eventsToShow
    );
    AppWrapper.unmount();
  });

  test('get list of all events when user selects "See all cities"', async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(
      CitySearch
    ).find('.suggestions li');
    await suggestionItems
      .at(suggestionItems.length - 1)
      .simulate('click');
    const allEvents = await getEvents();
    expect(AppWrapper.state('events')).toEqual(allEvents);
    AppWrapper.unmount();
  });

  test('App passes "numberOfEvents" state as prop to NumberOfEvents', () => {
    const AppWrapper = mount(<App />);
    const AppNumbersState = AppWrapper.state(
      'numberOfEvents'
    );
    expect(AppNumbersState).not.toEqual(undefined);
    expect(
      AppWrapper.find(NumberOfEvents).props().numberOfEvents
    ).toEqual(AppNumbersState);
    AppWrapper.unmount();
  });

  test('Change state of "numberOfEvents" when input changes', () => {
    const AppWrapper = mount(<App />);
    AppWrapper.setState({ numberOfEvents: 5 });
    const eventNumber = { target: { value: 10 } };
    AppWrapper.find('.number').simulate(
      'change',
      eventNumber
    );
    expect(AppWrapper.state('numberOfEvents')).toBe(10);
    AppWrapper.unmount();
  });
});
