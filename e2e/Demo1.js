"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var message1 = "Hello";
console.log(message1);
message1 = "Bye";
var age = 20;
console.log(age);
var isActive = false;
var numbers = [1, 2, 3];
var anyData = "This could be any type of data";
console.log(anyData);
function add(a, b) {
    return (a + b);
}
console.log(add(3, 5));
var user = { name: "Toby", age: 13, location: "Any" };
user.location = "Chicago";
var CartPage = /** @class */ (function () {
    function CartPage(page) {
        this.page = page;
        this.cartProducts = page.locator("div.li").first();
        this.productsText = page.locator(".card-body.b");
        this.cart = page.locator("[routerlink *= 'cart' ]");
        this.orders = page.locator("button [routerlink *= 'myorders' ]");
        this.checkout = page.locator("text=Checkout");
    }
    return CartPage;
}());
