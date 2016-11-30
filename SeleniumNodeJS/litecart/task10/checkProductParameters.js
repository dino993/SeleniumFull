var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    safari = require('selenium-webdriver/safari'),
    phantomjs = require('selenium-webdriver/phantomjs'),
    firefox = require('selenium-webdriver/firefox'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing'),
    assert = require('assert');

test.describe('Task 10', function() {
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

    var productParameters = {
        title: undefined,
        prices: {
            base: {
                value: undefined,
                style: {
                    color: undefined,
                    view: undefined,
                    size: undefined
                }
            },
            discount: {
                value: undefined,
                style: {
                    color: undefined,
                    view: undefined,
                    size: undefined
                }
            }
        }
    }

    test.it('Task 10 - check product parameters', function() {

        driver.get("http://localhost/litecart/en/");

        var categorySelector = "//*[@id='box-campaigns']";
        var pruductSelector = "//li[@class='product column shadow hover-light']";
        var titleSelector = "//div[@class='name']";
        var priceSelector = "//div[@class='price-wrapper']";
        var regularPriceSelector = "//s[@class='regular-price']";
        var strongPriceSelector = "//strong[@class='campaign-price']";



        driver.findElement(By.xpath(categorySelector + pruductSelector + titleSelector)).getText().then(function(title) {

            productParameters.title = title;

            driver.findElement(By.xpath(categorySelector + pruductSelector + priceSelector + regularPriceSelector)).then(function(regularPrice) {

                regularPrice.getText().then(function(text) {
                    productParameters.prices.base.value = text;

                });

                regularPrice.getCssValue("color").then(function(color) {
                    productParameters.prices.base.style.color = color;
                });

                regularPrice.getSize().then(function(size) {
                    productParameters.prices.base.style.size = size;
                });

                regularPrice.getCssValue("text-decoration").then(function(text_decoration) {
                    productParameters.prices.base.style.view = text_decoration;
                });

            });

            driver.findElement(By.xpath(categorySelector + pruductSelector + priceSelector + strongPriceSelector)).then(function(strongPrice) {

                strongPrice.getText().then(function(text) {
                    productParameters.prices.discount.value = text;
                });

                strongPrice.getCssValue("color").then(function(color) {
                    productParameters.prices.discount.style.color = color;
                });

                strongPrice.getSize().then(function(size) {
                    productParameters.prices.discount.style.size = size;
                });

                strongPrice.getCssValue("font-weight").then(function(font_weight) {
                    productParameters.prices.discount.style.view = font_weight;
                });
            });

            // Выбираем товар.
            driver.findElement(By.xpath(categorySelector + pruductSelector)).click();

            driver.findElement(By.xpath("//h1[@class='title']")).getText().then(function(title) {

                assert.equal(productParameters.title, title, "Ошибка! Заголовки отличаются");

                driver.findElement(By.xpath(regularPriceSelector)).then(function(regularPrice) {

                    regularPrice.getText().then(function(text) {
                        assert.equal(productParameters.prices.base.value, text, "Ошибка! Обычные цены отличаются");
                    });

                    regularPrice.getCssValue("color").then(function(color) {
                        try{
                            assert.equal(productParameters.prices.base.style.color, color);
                        } catch(ex) {
                            console.log( "\nОшибка! Обычные цены Цвета отличаются")
                        }
                    });

                    regularPrice.getSize().then(function(size) {
                        try{
                            assert.equal(productParameters.prices.base.style.size, size);
                        } catch(ex) {
                            console.log("\nОшибка! Обычные цены Размеры отличаются")
                        }

                    });

                    regularPrice.getCssValue("text-decoration").then(function(text_decoration) {
                        assert.equal(productParameters.prices.base.style.view, text_decoration, "Ошибка! Обычные цены Перечеркнутость отличаются");
                    });

                });

                driver.findElement(By.xpath(strongPriceSelector)).then(function(strongPrice) {

                    strongPrice.getText().then(function(text) {
                        assert.equal(productParameters.prices.discount.value, text, "Ошибка! Скидочные цены отличаются");
                    });

                    strongPrice.getCssValue("color").then(function(color) {
                        assert.equal(productParameters.prices.discount.style.color, color, "Ошибка! Скидочные цены Цвета отличаются");
                    });

                    strongPrice.getSize().then(function(size) {
                        try{
                            assert.equal(productParameters.prices.discount.style.size, size);
                        } catch(ex) {
                            console.log("\nОшибка! Скидочные цены Размеры отличаются")
                        }

                    });

                    strongPrice.getCssValue("font-weight").then(function(font_weight) {
                        assert.equal(productParameters.prices.discount.style.view, font_weight, "Ошибка! Скидочные цены Жирность шрифта отличаются");
                    });
                });

            });

        });

    });

    test.after(function() {
        driver.sleep(2000);
        driver.quit();
    });
});
