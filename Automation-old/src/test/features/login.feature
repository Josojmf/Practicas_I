@login
Feature: Login to MLA
    Background:
        Given I am on the landing page
    Scenario: Login to MLA
        When I click login button
        Then I should be redirected to mla page
