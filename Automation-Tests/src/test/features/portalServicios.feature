Feature: portal de servicios feature
 
 @testPortaldeServicios
    Scenario: portal de servicios main page validation
    Given User is logged in as valid user on portal de servicios
    When User is in main page of portal de servicios
    Then User should be able to see the url containing ServiciosApp