var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    safari = require('selenium-webdriver/safari'),
    phantomjs = require('selenium-webdriver/phantomjs'),
    firefox = require('selenium-webdriver/firefox'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing');

test.describe('Check all menues', function() {
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

    test.it('should do login by Admin', function() {
        driver.get('http://localhost/litecart/admin/login.php');
        driver.findElement(By.name('username')).sendKeys('admin');
        driver.findElement(By.name('password')).sendKeys('admin');
        driver.findElement(By.name('login')).click();
        driver.wait(until.titleIs('My Store'), 1000);
    });

    test.it('check menues', function() {

        var expectedMenues = [
            {
                main: "'Appearence'",
                inserted: ["'Template'", "'Logotype'"],
                expectedTitles: ["' Template'", "' Logotype'"]

            },
            {
                main: "'Catalog'",
                inserted: [
                    "'Catalog'", "'Product Groups'", "'Option Groups'",
                    "'Manufacturers'", "'Suppliers'", "'Delivery Statuses'",
                    "'Sold Out Statuses'", "'Quantity Units'", "'CSV Import/Export'"
                ],
                expectedTitles: [
                    "' Catalog'", "' Product Groups'", "' Option Groups'",
                    "' Manufacturers'", "' Suppliers'", "' Delivery Statuses'",
                    "' Sold Out Statuses'", "' Quantity Units'", "' CSV Import/Export'"
                ],
            },
            {
                main: "'Countries'",
                inserted: [],
                expectedTitles: ["' Countries'"]
            },
            {
                main: "'Currencies'",
                inserted: [],
                expectedTitles: ["' Currencies'"]
            },
            {
                main: "'Customers'",
                inserted: ["'Customers'", "'CSV Import/Export'", "'Newsletter'"],
                expectedTitles: ["' Customers'", "' CSV Import/Export'", "' Newsletter'"]
            },
            {
                main: "'Geo Zones'",
                inserted: [],
                expectedTitles: ["' Geo Zones'"]
            },
            {
                main: "'Languages'",
                inserted: ["'Languages'", "'Storage Encoding'"],
                expectedTitles: ["' Languages'", "' Storage Encoding'"]
            },
            {
                main: "'Modules'",
                inserted: [
                    "'Background Jobs'", "'Customer'", "'Shipping'",
                    "'Payment'", "'Order Total'", "'Order Success'",
                    "'Order Action'"
                ],
                expectedTitles: [
                    "' Job Modules'", "' Customer Modules'", "' Shipping Modules'",
                    "' Payment Modules'", "' Order Total Modules'", "' Order Success Modules'",
                    "' Order Action Modules'"
                ]
            },
            {
                main: "'Orders'",
                inserted: ["'Orders'", "'Order Statuses'"],
                expectedTitles: ["' Orders'", "' Order Statuses'"]
            },
            {
                main: "'Pages'",
                inserted: [],
                expectedTitles: ["' Pages'"]
            },
            {
                main: "'Reports'",
                inserted: ["'Monthly Sales'", "'Most Sold Products'", "'Most Shopping Customers'"],
                expectedTitles: ["' Monthly Sales'", "' Most Sold Products'", "' Most Shopping Customers'"]
            },
            {
                main: "'Settings'",
                inserted: [
                    "'Store Info'", "'Defaults'", "'General'",
                    "'Listings'", "'Images'", "'Checkout'",
                    "'Advanced'", "'Security'"
                ],
                expectedTitles: [
                    "' Settings'", "' Settings'", "' Settings'",
                    "' Settings'", "' Settings'", "' Settings'",
                    "' Settings'", "' Settings'"
                ]
            },
            {
                main: "'Slides'",
                inserted: [],
                expectedTitles: ["' Slides'"]
            },
            {
                main: "'Tax'",
                inserted: ["'Tax Classes'", "'Tax Rates'"],
                expectedTitles: ["' Tax Classes'", "' Tax Rates'"]
            },
            {
                main: "'Translations'",
                inserted: ["'Search Translations'", "'Scan Files'", "'CSV Import/Export'"],
                expectedTitles: ["' Search Translations'", "' Scan Files For Translations'", "' CSV Import/Export'"]
            },
            {
                main: "'Users'",
                inserted: [],
                expectedTitles: ["' Users'"]
            },
            {
                main: "'vQmods'",
                inserted: ["'vQmods'"],
                expectedTitles: ["' vQmods'"]
            }
        ];

        // Обход главного меню.
        for(var i = 0; i < expectedMenues.length; i++) {

            var menues = driver.findElement(By.xpath("//*[text()=" + expectedMenues[i].main + "]"));
            menues.getText().then(function(text) {
                console.log("Главное меню = " + text);
            });
            menues.click();

            if (expectedMenues[i].inserted.length === 0) {
                // Проверка наличия заголовка и его текста
                driver.findElement(By.xpath("//h1[text()=" + expectedMenues[i].expectedTitles[0] + "]")).then(function(titles) {
                    titles.getText().then(function(text) {
                        console.log("---------Найден Заголовк = " + text);
                    });
                });
            } else {
                // Обход подменю.
                for(var j = 0; j < expectedMenues[i].inserted.length; j++) {

                    var subMenues = driver.findElement(By.xpath("//span[@class='name'][text()=" + expectedMenues[i].inserted[j] + "]"));
                    subMenues.getText().then(function(text) {
                        console.log("---Вложенное меню = " + text);
                    });
                    subMenues.click();

                    // Проверка наличия заголовка и его текста
                    driver.findElement(By.xpath("//h1[text()=" + expectedMenues[i].expectedTitles[j] + "]")).then(function(titles) {
                        titles.getText().then(function(text) {
                            console.log("---------Найден Заголовк = " + text);
                        });
                    });
                }
            }
        }
        
    });

    test.after(function() {
        driver.sleep(2000);
        driver.quit();
    });
});
