// const { test, expect, request } = require("@playwright/test");
// const { APIUtils } = require("./utils/APIUtils");

// const fakePayLoadOrders = {
//   data: [],
//   message: "No orders",
// };

// const loginPayload = {
//   userEmail: "lavitae2@gmail.com",
//   userPassword: "Tansolo2!",
// };

// const orderPayload = {
//   orders: [
//     {
//       country: "Mexico",
//       productOrderedId: "6960eac0c941646b7a8b3e68",
//     },
//   ],
// };

// let response;

// test.beforeAll("Execute before all", async () => {
//   const apiContext = await request.newContext();
//   const apiUtils = new APIUtils(apiContext, loginPayload);

//   response = await apiUtils.createOrder(orderPayload);
// });

// test.skip("Place the order", async ({ page }) => {
//   await page.addInitScript((value) => {
//     window.localStorage.setItem("token", value);
//   }, response.token);

//   await page.goto("https://rahulshettyacademy.com/client/");

//   await page.route(
//     "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
//     async (route) => {
//       const apiResponse = await page.request.fetch(route.request());
//       await route.fulfill({
//         response: apiResponse,
//         body: JSON.stringify(fakePayLoadOrders),
//       });
//     }
//   );

//   await page.locator("button[routerlink='/dashboard/myorders']").click();
//   await page.waitForResponse(
//     "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*"
//   );
//   console.log(await page.locator(".mt-4").textContent());
//   await expect(page.locator(".mt-4")).toContainText("No orders");
// });