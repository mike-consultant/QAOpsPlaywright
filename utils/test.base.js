const base = require('@playwright/test');

exports.customtest = base.test.extend({
    testDataForOrder: async ({}, use) => {
        await use({
            productName: "ZARA COAT 3",
            username: "lavitae2@gmail.com",
            password: "Tansolo2!"
        });
    }
});