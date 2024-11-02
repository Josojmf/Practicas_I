Feature:Academico Nebrija Feature
    @academicoNebrija
    Scenario: Academico Nebrija Scenario
        Given User is logged in as validuser in academico nebrija page
        When I navigate to the Academico Nebrija page
        Then I should see the Academico Nebrija page
        When User searches for fechas in buscar un servicio input
        Then User should see a dropdown with results
    @academicoNebrijaLoginWithInvalidUser
    Scenario: Academico Nebrija Scenario Invalid User
        Given User tries to log in with invalid user
        Then User should see an error message with invalid user

    @academicoNebrijaLoginWithEmptyUser
    Scenario: Academico Nebrija Scenario Empty User
        Given User tries to log in with empty user
        Then User should see an error message about empty field

    @academicoNebrijaLoginWithInvalidPassword
    Scenario: Academico Nebrija Scenario Invalid Password
        Given User tries to log in with validuser but wrong password
        Then User should see an error message about invalid password
    @academicoNebrijaLoginValidUserWrongPass
    Scenario: Academico Nebrija Scenario Invalid Password
        Given User tries to log in with validuser but wrong password
        Then User should see an error message about invalid password