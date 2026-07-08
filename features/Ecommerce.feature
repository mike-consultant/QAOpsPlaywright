Feature: Ecommerce validations

  Scenario: Placing the Order
    Given A login to Ecommerce application with "lavitae2@gmail.com" and "Tansolo2!"
    When Adding "ZARA COAT 3" to Cart
    Then Verify "ZARA COAT 3" is displayed in the cart
    Then Verify order is present in the OrderHistory