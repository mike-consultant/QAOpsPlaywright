const {test, expect} = require ('@playwright/test');


test.skip ('First PlayWright Test', async ({browser}) =>
{
    //Write your PlayWright code here
    //JavaScript is asyncronous, you have to remember this
    //Chrome - Plugins / Cookies / Fresh new broswer (instance)
    //Storing the value as a variable  
    const context = await browser.newContext ();
    const page = await context.newPage();
    await page.goto ("https://rahulshettyacademy.com/client/#/auth/register");
    console.log(await page.title());

    //CSS Selector (Use type or fill)
    await page.locator('input#firstName').fill('Toby');
    await page.locator ('input#lastName').fill('Cruz');
    await page.locator ('input#userEmail').fill ('lavitae2@gmail.com'); 
    await page.locator ('input#userMobile').fill ('312-804-5983'); 
    //await page.locator("select[formcontrolname='occupation']").selectOption("Engineer");
    await page.locator("select[formcontrolname='occupation']").selectOption("Doctor")
    await page.locator("input[value='Male']").check();
    await page.locator("input[value='Female']").check();
    await page.locator('input#userPassword').fill('P@ssword');
    await page.locator('input#confirmPassword').fill('P@ssword');
    await page.locator("input[type='checkbox']").check(); 
    await page.locator('input#login').click();
    await page.waitForTimeout(10000);

   
   
    
});


// test.skip First PlayWright Test', async ({browser}) =>
// {
//     //Write your PlayWright code here
//     //JavaScript is asyncronous, you have to remember this
//     //Chrome - Plugins / Cookies / Fresh new broswer (instance)
//     //Storing the value as a variable  
//     const context = await browser.newContext ();
//     const page = await context.newPage();
//     await page.goto ("https://rahulshettyacademy.com/client/#/auth/login");
//     console.log(await page.title());

//     //CSS Selector (Use type or fill)
//     await page.locator ('input#userEmail').fill ('lavitae2@gmail.com'); 
//     await page.locator('input#userPassword').fill('Tansolo2!');
//     await page.locator('input#login').click();
//     await page.waitForTimeout(10000);

//});