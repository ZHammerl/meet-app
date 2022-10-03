Feature: Show and hide an event´s details

Scenario: An event element is collapsed by default.
Given the page is displaying available events
When the user hasn't selected any event
Then the user should see the event element collapsed

Scenario: User can expand an event to see its details.
Given user found an event that looks interesting and wants to know more
When the user clicks on the button (show details) of the event 
Then the user should see the details in an expanded view

Scenario: User can collapse an event to hide its details.
Given the event details are expanded
When user wants to see more events and closes the details view
Then the user should close the element details collapsing it