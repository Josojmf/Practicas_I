Feature: Login Feature
    #Working
    @loginPythonWebServiceNormalUser
    Scenario: Login with valid credentials
        Given User is in the login page
        When I enter "validuserpython" credentials
        Then I should see the home page
    #Working
    @loginPythonWebServiceInvalidCredentials
    Scenario: Login with invalid credentials
        Given User is in the login page
        When I enter "notvaliduserpython" credentials
        Then I should see an error message
    #Working
    @loginPythonWebServiceEmptyCredentials
    Scenario: Login with empty credentials
        Given User is in the login page
        When I dont enter any credentials
        Then Login Button should be disabled
    #Working
    @loginPythonWebServiceAdminUser
    Scenario: Login with admin user
        Given User is in the login page
        When I enter "adminuserpython" credentials
        Then I should see the admin page
    @accessPagesNotLoggedIn
    Scenario: Access restricted pages without loggin in
        Given User is in the login page
        When I dont enter any credentials
        Then Login Button should be disabled
        And I should not be able to access restricted pages
    Scenario: Login with valid credentials
        Given User is in the login page
        When I enter "validuserpython" credentials
        Then I should see the home page
    @allTagsLoginPythonWebService
    Scenario: Launch all tags
        Given User is in the login page
        When I enter "validuserpython" credentials
        Then I should see the home page
        Given User is in the login page
        When I enter "notvaliduserpython" credentials
        Then I should see an error message
        Given User is in the login page
        When I dont enter any credentials
        Then Login Button should be disabled
        Given User is in the login page
        When I enter "adminuserpython" credentials
        Then I should see the admin page
        Given User is in the login page
        When I dont enter any credentials
        Then Login Button should be disabled
    
    
    
