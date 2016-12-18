var webdriver = require('selenium-webdriver');

var By = webdriver.By,
    until = webdriver.until;

class MainPage {

    constructor(driver) {
        this.driver = driver;
    }

    open() {
        this.driver.get("http://localhost/litecart/en/");
        return this;
    }

    getCartCount() {
        return this.driver.findElement(By.xpath("//*[@class='quantity']")).getText().then(function(cartCount){
            return cartCount;
        });
    }

    waitExpectedProductCountInCart(productNumber) {
        this.driver.findElement(By.xpath("//*[@class='quantity' and text()='" + productNumber +"']"));
        return this;
    }

    chooseDuck(color) {
        this.driver.findElement(By.xpath("//*[@class='name' and text()='"+ color + " Duck']")).click();
        return this;
    }

}

exports.MainPage = MainPage;

