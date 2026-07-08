const { test, expect } = require("@playwright/test");

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Tansolo2!");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState("networkidle");
    await context.storageState({path:'state.json'});
});

test.skip ('Client App login', async ({ page }) => {
    const productName = 'ZARA COAT 3';
    const email = "lavitae2@gmail.com";
    const products = page.locator('.card-body'); //All products present in the page
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count(); 
    for (let i=0; i<count; i++){
        if (await products.nth(i).locator ('b').textContent() == productName){
            //Add logic to add the product 
            await products.nth(i).locator ("text= Add To Cart").click();
            break; 
        }
    }

    await page.locator('button[routerlink="/dashboard/cart"]').click (); 
    await page.locator('div li').first().waitFor(); 
    const boolValue = await page.locator ("h3:has-text('ZARA COAT 3')").isVisible();
    console.log(boolValue); // This will print "true" or "false"
    expect(boolValue).toBeTruthy();
    await page.locator ("text=Checkout").click ();

    await page.locator('input.input.txt').nth(1).fill("777");
    await page.locator('input.input.txt').nth(2).fill("Toby Cruz");
    await page.locator('input.input.txt').nth(3).fill("PROMO");
    await page.locator ("[placeholder='Select Country']").pressSequentially ("United Sta");

    const dropdown = page.locator (".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator ("button").count();
    
    for (let i=0; i<optionsCount; i++){
        let text = await dropdown.locator ("button").nth(i).textContent();
        if (text.trim () == "United States"){
            //Perform click on that operation 
            await dropdown.locator ("button").nth(i).click();
            break; 
        }
    }
    
    expect (page.locator (".details__user [type='text']").first()).toHaveText(email);
    await page.locator ("[class='btnn action__submit ng-star-inserted']").click ();
    await expect(page.locator(".hero-primary")).toContainText("Thankyou for the order.");
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


});