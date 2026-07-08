import { test, expect, Page, Locator } from '@playwright/test';

let message1: string = "Hello";
console.log (message1); 
message1 = "Bye";
let age: number = 20;
console.log (age); 

let isActive: boolean = false; 
let numbers: number[] = [1, 2, 3]; 
let anyData: any = "This could be any type of data";
console.log (anyData);


function add(a:number,b:number)
{
    return (a+b);
}

console.log (add(3, 5));

let user: {name: string, age: number, location: string} = {name: "Toby", age: 13, location: "Any"};
user.location = "Chicago";

class CartPage
{
    page: Page; 
    cartProducts: Locator;
    productsText: Locator; 
    cart: Locator; 
    orders: Locator; 
    checkout: Locator; 

    constructor(page: any)
    {
        this.page = page;
        this.cartProducts = page.locator("div.li").first();
        this.productsText = page.locator(".card-body.b");
        this.cart=page.locator("[routerlink *= 'cart' ]");
        this.orders = page.locator("button [routerlink *= 'myorders' ]");
        this.checkout = page.locator("text=Checkout");
    }

}