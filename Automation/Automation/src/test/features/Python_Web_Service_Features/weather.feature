Feature: Files page validation
    Background: User is logged in
        Given User is in the "home" page
        Then User clicks on "expandablemenu"
        And User clicks on "loginButton"
        Then User logs in as "validuserpython"
        Then I should see the home page
    #Working
   @testSearchForcity
    Scenario: User should be able to visualize city weather
        When User is in the "weather" page
        Then User searches for city "New York"
        Then User should see the weather for "New York" displayed