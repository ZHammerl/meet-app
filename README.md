# MEET APP

This is a serverless, progressive web application (PWA) built with React using a test-driven development (TDD) technique. The application uses the Google Calendar API to fetch upcoming events. This app can be used to filter and view upcoming events for a specific city.

## Description

The Meet App allows users to view upcoming developer meet-ups worldwide and to filter them by location and number of events. This is a fully-tested serverless progressive web application (pwa) using a test-driven development approach (TDD). It reaches near >90% code coverage.

An OOP approach is applied to create alerts for users (including an offline alert via service worker). An external Meetup API is used to fetch the events. OAuth2 Authentication is handled with Google API and authorization using AWS Lambda. The app also includes a visualization of events by city in a graph (via recharts library).
* responsive to all screen sizes
* users may be able to install the app on homescreen and add the app to their home screen on mobile
* works offline or in slow network conditions with the help of a service worker

## Implementation with TDD aproach

**Unit and Integration Testing**: Scenarios

**Behavioral Driven Development**: Gherkin syntax (given, when, then)

### User stories

1. As a user I should be able to filter events by city So that I can see the list of events that take place in that city.

2. As a user, I would like to be able to expand (and then again collapse) details on events so that I can get more information on an event.

3. As a user, I would like to be able to change the default number of 32 to any number of events, so that I can get a list of as many events as I have chosen.

4. As a user, I would like to use the app offline, so that I revisit the content I looked at the last time I was online.

5. As a user, I would like to see a chart when selecting a specific city, so that I know how many future events there are for the city selected.

6. As a user, I would like to be able to add the app shortcut to my home screen so that I can open the app faster.

### Example for feature and scenario for testing

FEATURE 1: FILTER EVENTS BY CITY

As a user, I would like to be able to filter events by city so that I can see the list of events that
take place in that city.

**Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities**

- **Given:** user hasn’t searched for any city
- **When:** the user opens the app
- **Then:** he user should see a list of all upcoming events

**Scenario 2: User should see a list of suggestions When they search for a city.**

- **Given:** the main page is open
- **When:** user starts typing in the city textbox
- **Then:** the user should see a list of cities (suggestions) that match what they’ve typed

**Scenario 3: User can select a city from the suggested list.**

- **Given:** the user was typing “Berlin” in the city textbox and the list of suggested cities is showing
- **When:** the user selects a city (e.g., “Berlin, Germany”) from the list
- **Then:** their city should be changed to that city (i.e., “Berlin, Germany”) and the user should receive a list of upcoming events in that city

