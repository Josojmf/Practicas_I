Feature: Register Feature
    #Working
    @registerValidCredentials
    Scenario: Register with valid credentials
        Given User is in the register page
        When I enter new credentials credentials for registration
        Then I should see confirmation message
    #Working
    @registerExistingCredentials
    Scenario: Register with existing credentials
        Given User is in the register page
        When I enter existing credentials credentials for registration
        Then I should see error message
    