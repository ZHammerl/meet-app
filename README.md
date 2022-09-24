# MEET APP

This is a serverless, progressive web application (PWA) built with React using a test-driven development (TDD) technique. The application uses the Google Calendar API to fetch upcoming events. This app can be used to filter and view upcoming events for a specifig city.

## FEATURES

**Unit and Integration Testing:** Scenarios
**Behavioral Driven Development**: Gherkin syntax (given, when, then)

### FEATURE 1: FILTER EVENTS BY CITY

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

### FEATURE 2: SHOW/HIDE AN EVENT’S DETAILS

As a user, I would like to be able to show/hide event details so that I can see more/less
information about an event.

**Scenario 1: An event element is collapsed by default.**

- **Given:** the page is displaying available events
- **When:** the user hasn't selected any event
- **Then:** the user should see the event element collapsed

**Scenario 2: User can expand an event to see its details.**

- **Given:** user found an event that looks interesting and wants to know more
- **When:** the user clicks on the button (show details) of the event 
- **Then:** the user should see the details in an expanded view

**Scenario 3: User can collapse an event to hide its details.**

- **Given:** the event details are expanded
- **When:** user wants to see more events and closes the details view
- **Then:** the user should close the element details collapsing it

### FEATURE 3: SPECIFY NUMBER OF EVENTS

As a user, I would like to be able to specify the number of events I want to view in the app so
that I can see more or fewer events in the events list at once.

**Scenario 1: When user hasn’t specified a number, 32 is the default number.**

- **Given:** the user sees a list of events
- **When:** the user hasn't specified a number of events to be viewed in the events list at once
- **Then:** the user should see a list of 32 events

**Scenario 2: User can change the number of events they want to see.**

- **Given:** the user sees a list of events
- **When:** the user wants to see more/less events and changes the number of events to be viewed at once
- **Then:** the user should see the specified amount of events

### FEATURE 4: USE THE APP WHEN OFFLINE

As a user, I would like to be able to use the app when offline so that I can see the events I
viewed the last time I was online.

**Scenario 1: Show cached data when there’s no internet connection.**

- **Given:** user is offline
- **When:** user opens the app
- **Then:** user should see the same events as last time they opened the app when online

**Scenario 2: Show error when user changes the settings (city, time range).**

- **Given:** user is offline
- **When:** user changes setting (e.g. city, time range)
- **Then:** user should see an error message indicating that they are offline

### FEATURE 5: DATA VISUALIZATION

As a user, I would like to be able to see a chart showing the upcoming events in each city so
that I know what events are organized in which city.

**Scenario 1: Show a chart with the number of upcoming events in each city.**

- **Given:** the start page is open
- **When:** user hasn't specified a city
- **Then:** user sees a chart with the number of upcoming events in each city
