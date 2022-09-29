import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

import { mockData } from '../mock-data';
import { extractLocations } from '../api';

const locations = extractLocations(mockData);

const feature = loadFeature(
  './src/features/showHideAnEventsDetails.feature'
);

defineFeature(feature, (test) => {
  test('An event element is collapsed by default.', ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    given(
      'the page is displaying available events',
      async () => {
        AppWrapper = mount(<App />);
      }
    );

    when("the user hasn't selected any event", () => {
      AppWrapper.update();
    });

    then(
      'the user should see the event element collapsed',
      () => {
        expect(
          AppWrapper.find('.details-container')
        ).toHaveLength(0);
      }
    );
  });

  test('User can expand an event to see its details.', ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    given(
      'user found an event that looks interesting and wants to know more',
      async () => {
        AppWrapper = await mount(<App />);
        expect(
          AppWrapper.find('.details-container')
        ).toHaveLength(0);
      }
    );

    when(
      'the user clicks on the button (show details) of the event',
      () => {
        AppWrapper.update();
        AppWrapper.find('.details-btn')
          .at(0)
          .simulate('click');
      }
    );

    then(
      'the user should see the details in an expanded view',
      () => {
        expect(
          AppWrapper.find('.details-container')
        ).toHaveLength(1);
      }
    );
  });

  test('User can collapse an event to hide its details.', ({
    given,
    when,
    then,
  }) => {
    let AppWrapper;
    given('the event details are expanded', async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.update();
      AppWrapper.find('.details-btn')
        .at(0)
        .simulate('click');
      expect(
        AppWrapper.find('.details-container')
      ).toHaveLength(1);
    });

    when(
      'user wants to see more events and closes the details view',
      () => {
        AppWrapper.find('.details-btn')
          .at(0)
          .simulate('click');
      }
    );

    then(
      'the user should close the element details collapsing it',
      () => {
        expect(
          AppWrapper.find('.details-container')
        ).toHaveLength(0);
      }
    );
  });
});
