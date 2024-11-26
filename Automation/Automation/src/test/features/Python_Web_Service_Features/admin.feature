Feature: Admin page validation
    Background: User is logged in
        Given User is in the login page
        When I enter "adminuserpython" credentials
        Then I should see the admin page
    #Working
    @adminPageValidation
    Scenario: Admin page validation
        Then User should see "Manage Users" link
        And User should see "View System Logs" link
        And User should see "Site Settings" link
        Then env variables are "joso" "test123" "Final" "Practicas_I_Automation_Project" "Users" "Logs" "Settings" "Messages"
        And User should see total users number "10"
    #Working
    @adminPageSiteSettings
    Scenario: Admin page site settings
        Then User should see "Site Settings" link
        When User clicks on "Site Settings" link
    #Working
    @adminPageViewSystemLogs
    Scenario: Admin page view system logs
        Then User should see "View System Logs" link
        When User clicks on "View System Logs" link
    
    @adminPageManageUsers
    Scenario: Admin page manage users
        Then User should see "Manage Users" link
        When User clicks on "Manage Users" link