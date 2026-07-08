const {test, expect} = require ('@playwright/test');


test.skip('First PlayWright Test', async ({browser}) =>
{
    //Write your PlayWright code here
    //JavaScript is asyncronous, you have to remember this
    //Chrome - Plugins / Cookies / Fresh new broswer (instance)
    //Storing the value as a variable  
    const context = await browser.newContext ();
    const page = await context.newPage();
    //page.route ('**/*.{jpg, gif, jpeg, npg}', route => route.abort());
    
    page.on("request", request => console.log(request.url()));
    page.on ("response", response => console.log (response.url (), response.status()));
    await page.goto ("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    //CSS Selector (Use type or fill)
    await page.locator('input#username').fill('rahulshettyacademy');
    await page.locator ('input#password').fill('Learning@830$3mK2');
    await page.locator ('input#signInBtn').click();

    //Wait until this locator shows up 
    console.log (await page.locator("[style*='display']").textContent());
    await expect(page.locator("[style*='display']")).toContainText("Incorrect username");

    //Wipe out the incorrect (entered) values
    // await userName.fill("");
    // await userName.fill('rahulshettyacademy');
    // await page.locator ('input#signInBtn').click();

    console.log (await page.locator (".card-body a").first().textContent ());
    //console.log (await page.locator (".card-body a").nth(1).textContent ());
    console.log(await page.locator (".card-body a").allTextContents());
   
   
    
});


test.skip ('Page PlayWright Test', async ({page}) =>
{
    //Write your PlayWright code here
    //JavaScript is asyncronous, you have to remember this
    await page.goto ("https://www.google.com/"); 
    
    //Get the title & assertion 
    console.log (await page.title ());
    await expect(page).toHaveTitle("Google");
});

test ('Screensht and Visual Comparisson', async ({page}) => {

await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
await expect(page.locator("#displayed-text")).toBeVisible();
await page.locator("#hide-textbox").click();
await page.screenshot({path: 'screenshot.png'});
await expect(page.locator("#displayed-text")).toBeHidden();

});

