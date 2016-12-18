var webdriver = require('selenium-webdriver');

var By = webdriver.By,
    until = webdriver.until;

class ProductPage {

    constructor(driver) {
        this.driver = driver;
    }

    addToCart() {
        this.driver.findElement(By.name("add_cart_product")).click();
        return this;
    }

}

exports.ProductPage = ProductPage;

