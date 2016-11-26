var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    safari = require('selenium-webdriver/safari'),
    phantomjs = require('selenium-webdriver/phantomjs'),
    firefox = require('selenium-webdriver/firefox'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing'),
    assert = require('assert');

test.describe('Task 8', function() {
    var driver;

    test.before(function() {
        var options = new chrome.Options();
        options.addArguments(["start-fullscreen"]);

        driver = new webdriver.Builder()
            //.withCapabilities({'marionette': true})
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        driver.getCapabilities().then(function(caps) {
            console.log(caps);
            driver.manage().timeouts().implicitlyWait(10000/*ms*/);
        });
    });

    test.it('Task 8 - check  is sticker  single', function() {
        driver.get('http://localhost/litecart/en/');

        var expectedNumberOfStickers = 1;

        products = driver.findElements(By.className("image-wrapper")).then(function(products) {
            console.log("\nНайдено товаров = " + products.length);

            for(var i = 0; i < products.length; i++) (function (x) {
                products[x].findElements(By.css("[class *= sticker]")).then(function(stickers) {
                    console.log("\nЧисло стикер у " + x + "-ого товара = " + stickers.length);

                    assert.equal(stickers.length, expectedNumberOfStickers, "Ошибка! Возможен только 1 стикер!");

                    stickers[0].getText().then(function (text) {
                        console.log(" Текст стикера = " + text);
                    });

                });
            })(i);

        });

    });

    test.after(function() {
        driver.sleep(2000);
        driver.quit();
    });
});
