const {test, expect} = require ('@playwright/test');


test.skip('First PlayWright Test 1', async ({browser}) =>
{
    //Write your PlayWright code here
    //JavaScript is asyncronous, you have to remember this
    //Chrome - Plugins / Cookies / Fresh new broswer (instance)
    //Storing the value as a variable  
    const context = await browser.newContext ();
    const page = await context.newPage();
    await page.goto ("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    //CSS Selector (Use type or fill)
    const documentLink = await page.locator ('a[href*="documents-request"]');
    await page.locator('input#username').fill('rahulshettyacademy');
    await page.locator ('input#password').fill('Learning@830$3mK2');
    await page.locator("input[value='user']").check();
    await page.locator ('button#okayBtn').click();

    await page.locator('select.form-control').selectOption ("Consultant");
    await page.locator('input#terms').check();
    //await page.locator('input#terms').uncheck();
    await page.locator('input#signInBtn').click (); 

    
    await expect(documentLink).toHaveAttribute("class", "blinkingText")
    //await page.pause();
    //await page.waitForTimeout(10000);


});

test.skip('Child Windows Handling', async ({ browser }) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = await page.locator('input#username');

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    const documentLink = page.locator('a[href*="documents-request"]');

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
    ]);

    const text = await newPage.locator('.red').textContent();
    console.log(text);
    const arrayText = text.split('@');
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);
  
    await page.bringToFront();

    // Enter domain into username field
    await page.locator('input#username').fill(domain);

    // Print entered value
    console.log(await page.locator('input#username').inputValue());

    await page.waitForTimeout(10000);

});