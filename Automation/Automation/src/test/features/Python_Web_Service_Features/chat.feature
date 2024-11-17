Feature: Chat page validation
    Background: User is logged in
        Given User is in the "home" page
        Then User clicks on "expandablemenu"
        And User clicks on "loginButton"
        Then User logs in as "validuserpython"
        Then I should see the home page

    @testchatsendmessage
    Scenario: User should be able to send message
        When User is in the "chat" page
        When I enter "Hello" in the message box
        And I click on send button
        Then I should see the message with text "hello" in the chat window
        @testchatsendmessageAndOtherUserView
    Scenario: User should be able to send message
        When User is in the "chat" page
        When I enter "Hello" in the message box
        And I click on send button
        Then I should see the message with text "hello" in the chat window
        And User clicks on "expandablemenu"
        And User clicks on "logoutButton"
        And User is in the "home" page
        Then User clicks on "expandablemenu"
        And User clicks on "loginButton"
        Then User logs in as "validuserpython2"
        When User is in the "chat" page
        Then I should see the message with text "hello" in the chat window