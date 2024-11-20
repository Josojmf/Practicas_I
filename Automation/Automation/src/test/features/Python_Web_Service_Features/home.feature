Feature: Home page validation
    Background: User is logged in
        Given User is in the "home" page
        Then User clicks on "expandablemenu"
        And User clicks on "loginButton"
        Then User logs in as "validuserpython"
        Then I should see the home page
    #Working
   @testhomePageValiation
    Scenario: User should be able to navigate to all pages
    When User is in the "home" page
    Then I should see the home page
    And I should see the four menus
    #Working   
   @testhomePageLinksCorrectReddirection
    Scenario: User should be able to navigate to all pages
    When User is in the "home" page
    Then I should see the home page
    And I should see the four menus 
    When I click the "View Files" link 
    Then I should see the "View Files" page
    When I click the "Weather" link
    Then I should see the "Weather" page
    When I click the "Go to Chat" link
    Then I should see the "Chat" page
