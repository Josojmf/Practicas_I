Feature:Academico Nebrija Admisiones Page Feature

@validationOfAdmisionesPage
Scenario: Validation of Admisiones Page
    Given User is logged in as validuser in academico nebrija page for validation of Admisiones page
    When User clicks Admisiones tab
    Then User should see the Admisiones dropdown
   