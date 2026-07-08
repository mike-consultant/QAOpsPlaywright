Feature: Ecommerce validations

@Regression 
@food
Scenario Outline: Placing the Order
    Given A login to Ecommerce application with "<username>" and "<password>"
    Then Verify error message is displayed 

    Examples: 
    | username           | password |
    | food@gmail.com | Tansolo2 |
     | lavitae2@gmail.com | Tansolo2!|

@Validation
@drink
Scenario Outline: Placing the Order
    Given A login to Ecommerce application with "<username>" and "<password>"
    Then Verify error message is displayed 

    Examples: 
    | username           | password |
    | drink@gmail.com | Tansolo2 |
     | lavitae2@gmail.com | Tansolo2!|