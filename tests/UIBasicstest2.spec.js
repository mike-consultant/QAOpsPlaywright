const {test} = require ('@playwright/test');

test.skip('Browser Context Playwright Test', async ({browser})=>
{
    //Chrome 
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.facebook.com");
 
});

test.skip('Page Context Playwright Test', async ({page})=>
{
    await page.goto("https://www.facebook.com");
 
});