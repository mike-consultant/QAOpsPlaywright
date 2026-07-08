const { expect } = require("@playwright/test");

class APIUtils {

    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {

        const loginResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/auth/login",
            { data: this.loginPayload }
        );

        expect(loginResponse.ok()).toBeTruthy();

        const loginResponseJSON = await loginResponse.json();
        return loginResponseJSON.token;
    }

    async createOrder(orderPayload) {

        let response = {};

        response.token = await this.getToken();

        const orderResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers: {
                    Authorization: response.token,
                    "Content-Type": "application/json"
                }
            }
        );

        expect(orderResponse.ok()).toBeTruthy();

        const orderResponseJSON = await orderResponse.json();

        response.orderId = orderResponseJSON.orders[0];

        return response;
    }
}

module.exports = { APIUtils };