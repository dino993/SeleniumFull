var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),

    registration_page = require('../pages/registration_page'),
    admin_panel_login_page = require('../pages/admin_panel_login_page'),
    customer_list_page = require('../pages/customer_list_page'),

    main_page = require('../pages/main_page'),
    product_page = require('../pages/product_page'),
    checkout_page = require('../pages/checkout_page');

class Application {

    constructor() {

        var options = new chrome.Options();
        options.addArguments(["start-fullscreen"]);

        this.driver = new webdriver.Builder()
            .forBrowser("chrome")
            .setChromeOptions(options)
            .build();
        this.driver.manage().timeouts().implicitlyWait(10000);

        this.registrationPage = new registration_page.RegistrationPage(this.driver);
        this.adminPanelLoginPage = new admin_panel_login_page.AdminPanelLoginPage(this.driver);
        this.customerListPage = new customer_list_page.CustomerListPage(this.driver);

        this.main_page = new main_page.MainPage(this.driver);
        this.product_page = new product_page.ProductPage(this.driver);
        this.checkout_page = new checkout_page.CheckoutPage(this.driver);
    }

    quit() {
        this.driver.sleep(2000);
        this.driver.quit();
    }

    registerNewCustomer(customer) {
        this.registrationPage.open();
        this.registrationPage.firstnameInput().sendKeys(customer.firstname);
        this.registrationPage.lastnameInput().sendKeys(customer.lastname);
        this.registrationPage.address1Input().sendKeys(customer.address);
        this.registrationPage.postcodeInput().sendKeys(customer.postcode);
        this.registrationPage.cityInput().sendKeys(customer.city);
        this.registrationPage.selectCountry(customer.country);
        this.registrationPage.selectZone(customer.zone);
        this.registrationPage.emailInput().sendKeys(customer.email);
        this.registrationPage.phoneInput().sendKeys(customer.phone);
        this.registrationPage.passwordInput().sendKeys(customer.password);
        this.registrationPage.confirmedPasswordInput().sendKeys(customer.password);
        this.registrationPage.createAccountButton().click();
    }

    getCustomerIds() {
        var ap = this.adminPanelLoginPage;
        ap.open().onThisPageDo(function() {
            ap.enterUsername("admin").enterPassword("admin").submitLogin();
        });
        return this.customerListPage.open().getCustomerIds();
    }

    getCartCount() {
        return this.main_page.open().getCartCount();
    }

    addDuckToCart(color) {
        this.main_page.chooseDuck(color);
        this.product_page.addToCart();
    }

    checkDuckAdded(productNumber) {
        this.main_page.waitExpectedProductCountInCart(productNumber).open();
        return this;
    }

    goToCartPage() {
        this.checkout_page.open();
    }

    getDuckTitleText () {
        return this.checkout_page.getDuckTitleText();
    }

    deleteDuckFromCart(duckTitleText) {

        // Проверяем, что приплыла утка.
        this.checkout_page.checkExpectedProductIsVisible(duckTitleText);

        // Находим элемент в таблице до удаления.
        var duckInTable = this.checkout_page.getProductTitleInTable(duckTitleText);
        // Удаляем утку.
        this.checkout_page.removeItemFromCart();

        // Ждем исчезновения утки из таблицы.
        this.checkout_page.waitProductIsRemoved(duckInTable);
    }

}

exports.Application = Application;
