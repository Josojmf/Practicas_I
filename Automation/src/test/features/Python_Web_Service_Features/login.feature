Feature: Login Feature

    @loginPythonWebService
    Scenario: Login with valid credentials
        Given User is in the login page
        When I enter valid credentials
        Then I should see the home page

    @loginPythonWebServiceInvalidCredentials
    Scenario: Login with invalid credentials
        Given User is in the login page
        When I enter invalid credentials
        Then I should see an error message

    @loginPythonWebServiceEmptyCredentials
    Scenario: Login with empty credentials
        Given User is in the login page
        When I enter empty credentials
        Then I should see an error message

    @loginPythonWebServiceAdminUser
    Scenario: Login with admin user
        Given User is in the login page
        When I enter admin credentials
        Then I should see the admin page
