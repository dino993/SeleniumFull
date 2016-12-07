var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    safari = require('selenium-webdriver/safari'),
    phantomjs = require('selenium-webdriver/phantomjs'),
    firefox = require('selenium-webdriver/firefox'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing'),
    assert = require('assert');

test.describe('Task 13', function() {
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

    var ducksColors = ["Green", "Red", "Purple"];

    test.it('Task 13 - wait and checkout cart', function() {

        driver.get("http://localhost/litecart/en/");

        driver.findElement(By.xpath("//*[@class='quantity']")).getText().then(function(text){

            console.log("\nИсходное число товаров в корзине = " + text);
            var productNumber = parseInt(text);
            assert.equal(0, productNumber, "Корзин не пустая");

            for(var i = 0; i < ducksColors.length; i++) {
                productNumber++;
                driver.findElement(By.xpath("//*[@class='name' and text()='"+ ducksColors[i] + " Duck']")).click();
                driver.findElement(By.name("add_cart_product")).click();

                // Ждем обновление счетчика.
                driver.findElement(By.xpath("//*[@class='quantity' and text()='" + productNumber +"']"));

                driver.get("http://localhost/litecart/en/");
            }

            // Проверка, что добавились все утки.
            var cartNumber = driver.findElement(By.xpath("//*[@class='quantity']"));
            cartNumber.getText().then(function(text) {
                assert.equal(ducksColors.length, parseInt(text), "Добавились не все утки");
                cartNumber.click();
            }).then(function(){
                for(var i = 0; i < ducksColors.length; i++) (function (x) {

                    driver.findElement(By.css("[name=cart_form]  a > strong")).getText().then(function(duckTitleText){

                        // Проверяем, что приплыла утка.
                        driver.findElement(By.xpath("//strong[text()='"+ duckTitleText + "']")).then(function(duckTitle){

                            driver.wait(until.elementIsVisible(duckTitle), 5000/*ms*/).then(function(){

                                // Находим элемент в таблице до удаления.
                                driver.findElement(By.xpath("//*[@class='item' and text()='"+ duckTitleText + "']")).then(function(duckInTable) {
                                    // Удаляем утку.
                                    driver.findElement(By.name("remove_cart_item")).click();
                                    // Ждем исчезновения утки из таблицы.
                                    driver.wait(until.stalenessOf(duckInTable), 5000).then(function () {
                                        console.log("Утка " + duckTitleText + " исчезла из таблицы, идем дальше");
                                    });
                                });
                            });
                        });
                    });
                })(i);
            });


        });


    });

    test.after(function() {
        driver.sleep(2000);
        driver.quit();
    });
});
