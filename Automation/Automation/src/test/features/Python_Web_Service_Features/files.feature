Feature: Files page validation
    Background: User is logged in
        Given User is in the "home" page
        Then User clicks on "expandablemenu"
        And User clicks on "loginButton"
        Then User logs in as "validuserpython"
        Then I should see the home page
    #Working
   @testuploadFile
    Scenario: User should be able to upload file
        When User is in the "files" page
        Then User uploads file "sample"
        When User clicks on "uploadFileButton" on files page
        Then User should see the file "sample" uploaded successfully