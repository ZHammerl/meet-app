import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents/> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test('text input is rendered correctly', () => {
    expect(
      NumberOfEventsWrapper.find('.number-input')
    ).toHaveLength(1);
  });

  test('default number in input is 32', () => {
    expect(
      NumberOfEventsWrapper.find('.number-input').prop(
        'value'
      )
    ).toBe(32);
  });

  test('change state when number input changes', () => {
    NumberOfEventsWrapper.setState({
      numOfEvents: 32,
    });
    const eventNumber = { target: { value: 5 } };
    NumberOfEventsWrapper.find('.number-input').simulate(
      'change',
      eventNumber
    );
    expect(NumberOfEventsWrapper.state('numOfEvents')).toBe(
      5
    );
  });
});
