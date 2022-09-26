import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event/> component', () => {
  let event, EventWrapper;
  beforeAll(() => {
    event = mockData[0];
    EventWrapper = shallow(<Event event={event} />);
  });
  beforeEach(() => {
    EventWrapper.setState({
      show: false,
    });
  });

  test('render title in event item', () => {
    expect(EventWrapper.find('.event-title')).toHaveLength(
      1
    );
  });

  test('render event title correctly', () => {
    expect(EventWrapper.find('.event-title').text()).toBe(
      event.summary
    );
  });

  test('render event start date and time', () => {
    expect(EventWrapper.find('.dateTime')).toHaveLength(1);
    expect(EventWrapper.find('.dateTime').text()).toContain(
      event.start.dateTime
    );
    expect(EventWrapper.find('.dateTime').text()).toContain(
      event.start.timeZone
    );
  });

  test('render event location', () => {
    expect(EventWrapper.find('.location')).toHaveLength(1);
    expect(EventWrapper.find('.location').text()).toBe(
      event.location
    );
  });
  test('render show details button', () => {
    expect(EventWrapper.find('.details-btn')).toHaveLength(
      1
    );
  });

  test('render details container', () => {
    EventWrapper.setState({
      show: true,
    });
    expect(
      EventWrapper.find('.details-container')
    ).toHaveLength(1);
  });
  test('render "about event" in details', () => {
    EventWrapper.setState({
      show: true,
    });
    expect(EventWrapper.find('.event-about')).toHaveLength(
      1
    );
    expect(EventWrapper.find('.event-about').text()).toBe(
      'About event:'
    );
  });

  test('render event description', () => {
    EventWrapper.setState({
      show: true,
    });
    expect(EventWrapper.find('.description')).toHaveLength(
      1
    );
    expect(EventWrapper.find('.description').text()).toBe(
      event.description
    );
  });

  test('render google calendar html link', () => {
    EventWrapper.setState({
      show: true,
    });
    expect(EventWrapper.find('.event-link')).toHaveLength(
      1
    );
  });


  test('event details collapsed by default', () => {
    expect(EventWrapper.state('show')).toBe(false);
  });

  test('click to expand test details', () => {
    EventWrapper.find('.details-btn').simulate('click');
    expect(EventWrapper.state('show')).toBe(true);
  });
});
