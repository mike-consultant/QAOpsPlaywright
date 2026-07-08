// const { test, expect, request } = require("@playwright/test");
// const { APIUtils } = require("./utils/APIUtils");

// const loginPayload = {
//     userEmail: "lavitae2@gmail.com",
//     userPassword: "Tansolo2!"
// };

// const orderPayload = {
//     orders: [{
//         country: "Mexico",
//         productOrderedId: "6960eac0c941646b7a8b3e68"
//     }]
// };

// let response;

// test.beforeAll("Execute before all", async () => {

//     const apiContext = await request.newContext();
//     const apiUtils = new APIUtils(apiContext, loginPayload);
//     response = await apiUtils.createOrder(orderPayload);
// });

// test.skip("Place the order", async ({ page }) => {

//     await page.addInitScript(value => {
//         window.localStorage.setItem("token", value);
//     }, response.token);

//     await page.goto("https://rahulshettyacademy.com/client/");
//     const confirmation = response.orderId;
//     await page.locator("button[routerlink='/dashboard/myorders']").click();
//     await page.locator("tbody tr").first().waitFor();
//     const rows = page.locator("tbody tr");
//     const rowsCount = await rows.count();

//     for (let i = 0; i < rowsCount; i++) {

//         const rowOrderId = (await rows.nth(i).locator("th").textContent()).trim();
//         console.log("Confirmation:", confirmation);
//         console.log("Row:", rowOrderId);

//         if (confirmation.includes(rowOrderId)) {

//             console.log("Order found!");
//             await rows.nth(i).locator("button.btn-primary").click();
//             const orderDetails = (await page.locator(".col-text").first().textContent()).trim();
//             console.log("Order Details:", orderDetails);
//             console.log("Row Order Id:", rowOrderId);
//             expect(orderDetails).toBe(rowOrderId);
//             break;
//         }
//     }
// });