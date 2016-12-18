var webdriver = require('selenium-webdriver');

var By = webdriver.By,
    until = webdriver.until;

class CheckoutPage {

    constructor(driver) {
        this.driver = driver;
    }

    open() {
        this.driver.get("http://localhost/litecart/en/checkout");
        return this;
    }

    getDuckTitleText () {
        return this.driver.findElement(By.css("[name=cart_form]  a > strong")).getText().then(function(duckTitleText) {
            return duckTitleText;
        });
    }

    checkExpectedProductIsVisible (duckTitleText) {
        var duckTitle = this.driver.findElement(By.xpath("//strong[text()='" + duckTitleText + "']"));
        this.driver.wait(until.elementIsVisible(duckTitle), 5000);
    }

    getProductTitleInTable (duckTitleText) {
        return this.driver.findElement(By.xpath("//*[@class='item' and text()='" + duckTitleText + "']"));
    }

    removeItemFromCart () {
        this.driver.findElement(By.name("remove_cart_item")).click();
    }

    waitProductIsRemoved (duckInTable) {
        this.driver.wait(until.stalenessOf(duckInTable), 5000);
    }

}

exports.CheckoutPage = CheckoutPage;

