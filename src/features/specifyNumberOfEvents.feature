Feature: SPECIFY NUMBER OF EVENTS

Scenario: When user hasn’t specified a number, 20 is the default number.
Given the user opens the app
When the user hasn't specified a number of events to be viewed in the events list at once
Then the user should see a list of 20 events

Scenario: User can change the number of events they want to see.
Given the user opens the app
When the user changes the number of events to be viewed at once
Then the user should see the specified amount of events
