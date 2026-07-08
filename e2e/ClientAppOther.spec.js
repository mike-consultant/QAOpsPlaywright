const { test, expect } = require('@playwright/test');

test.skip('Client App login 1', async ({ page }) => {
    const productName = 'ZARA COAT 3';
    const email = "lavitae2@gmail.com";
    const products = page.locator('.card-body'); //All products present in the page
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder('email@example.com').fill(email);
    await page.getByPlaceholder('enter your passsword').type("Tansolo2!");
    await page.getByRole('button', {name:'login'}).click();
    await page.waitForLoadState('networkidle');
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    await page.locator(".card-body").filter({ hasText: 'ZARA COAT 3' }).getByRole('button', { name: " Add To Cart" }).click();
    await page.getByRole('listitem').getByRole('button', {name:"  Cart "}).click();
    await page.locator('div li').first().waitFor(); 
    await expect(page.getByText(productName)).toBeVisible();
    await page.getByRole('button', {name:"Checkout"}).click(); 
    await page.locator('input.input.txt').nth(1).fill("777");
    await page.locator('input.input.txt').nth(2).fill("Toby Cruz");
    await page.locator('input.input.txt').nth(3).fill("PROMO");

    await page.getByPlaceholder("Select Country").pressSequentially ("United Sta");
    await page.getByRole("button", {name: "United States"}).nth(0).click();
   
    await page.getByText("Place Order ").click ();
    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
   
    const confirmation = (await page.locator('.em-spacer-1 .ng-star-inserted').first().textContent()).trim();
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    await page.locator('tbody tr').first().waitFor();
    const rows = page.locator('tbody tr');
    const rowsCount = await rows.count();

    for (let i = 0; i < rowsCount; i++) {
        const rowOrderId = (await rows.nth(i).locator('th').textContent()).trim();
        console.log("Confirmation:", confirmation);
        console.log("Row:", rowOrderId);

        if (confirmation.includes(rowOrderId)) {
       console.log("Order found!");
        await rows.nth(i).locator("button.btn-primary").click();
        
        const orderDetails = (await page.locator(".col-text").first().textContent()).trim();

        console.log("Order Details:", orderDetails);
        console.log("Row Order Id:", rowOrderId);
        expect(orderDetails).toBe(rowOrderId);

        break;
        }
       
    }

    await page.pause();

});