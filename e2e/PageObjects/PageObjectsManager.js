const { LoginPage } = require('./LoginPage');
const { DashboardPage } = require('./DashboardPage');

class PageObjectsManager {
    constructor(page) {
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }
}

module.exports = { PageObjectsManager };