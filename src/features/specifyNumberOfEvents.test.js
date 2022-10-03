import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';

import App from '../App';

const feature = loadFeature(
  './src/features/specifyNumberofEvents.feature'
);

defineFeature(feature, (test) => {
  test('When user hasn’t specified a number, 20 is the default number.', ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    given('the user opens the app', () => {});

    when(
      "the user hasn't specified a number of events to be viewed in the events list at once",
      () => {
        AppWrapper = mount(<App />);
      }
    );

    then('the user should see a list of 20 events', () => {
      AppWrapper.update();
      expect(AppWrapper.state('numberOfEvents')).toEqual(
        20
      );
    });
  });

  test('User can change the number of events they want to see.', ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    given('the user opens the app', () => {
      AppWrapper = mount(<App />);
    });

    when(
      'the user changes the number of events to be viewed at once',
      () => {
        AppWrapper.update();
        AppWrapper.find('.number-input').simulate(
          'change',
          { target: 1 }
        );
      }
    );

    then(
      'the user should see the specified amount of events',
      () => {
        expect(AppWrapper.find('.EventList')).toHaveLength(
          1
        );
      }
    );
  });
});
