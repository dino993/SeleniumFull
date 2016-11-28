var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    safari = require('selenium-webdriver/safari'),
    phantomjs = require('selenium-webdriver/phantomjs'),
    firefox = require('selenium-webdriver/firefox'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing'),
    generalParameters = require('./../generalParameters'),
    assert = require('assert');

test.describe('Task 7', function() {
    var driver;
    var columnIndex = undefined;

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

    test.it('Task 3 - should do login by Admin', function() {
        driver.get('http://localhost/litecart/admin/login.php');
        driver.findElement(By.name('username')).sendKeys(generalParameters.authorithation.admin.login);
        driver.findElement(By.name('password')).sendKeys(generalParameters.authorithation.admin.password);
        driver.findElement(By.name('login')).click();
        driver.wait(until.titleIs('My Store'), 1000);
    });

    test.it('Task 9_1_a - check countries alphabet', function() {
        console.log("\n-----------------Запускаем тест Task 9_1_a");
        var counrtiesList = [];

        driver.get('http://localhost/litecart/admin/?app=countries&doc=countries').then(

            getColumnNameIndex("Name")).then(function () {

                var cssSelecrotForCountries = ".row > td:nth-child(" + columnIndex + ")";
                driver.findElements(By.css(cssSelecrotForCountries)).then(function (countries) {

                    for (var i = 0; i < countries.length; i++) (function (x) {
                        countries[x].getAttribute("textContent").then(function (countryText) {

                            counrtiesList.push(countryText);

                        });
                    })(i);
                }).then(function(){

                    console.log("Длина массива стран = " + counrtiesList.length + "\n");
                    assert.ok(isArraySortedByAlphabet(counrtiesList), "Массив не отсортирован по алфавиту");
                    console.log("Массив отсортирован по алфавиту\n");

                });
            });
    });

    test.it('Task 9_1_b - check zones alphabet', function() {
        console.log("\n-----------------Запускаем тест Task 9_1_b");
        var zonesList = [];
        var indexesContriesWithZones = [];
        driver.get('http://localhost/litecart/admin/?app=countries&doc=countries').then(

            getColumnNameIndex("Zones")).then(function () {

                var cssSelecrotForZones = ".row > td:nth-child(" + columnIndex + ")";
                driver.findElements(By.css(cssSelecrotForZones)).then(function (zones) {

                    for (var i = 0; i < zones.length; i++) (function (x) {
                        zones[x].getAttribute("textContent").then(function (zoneText) {

                            if (parseInt(zoneText) > 0) {
                                console.log("\nКоличеств зон = " + zoneText);
                                indexesContriesWithZones.push(x);

                            }
                        });
                    })(i);
                }).then( function() {

                        for (var i = 0; i < indexesContriesWithZones.length; i++) (function (x) {
                            driver.findElements(By.css(".fa.fa-pencil")).then(function (pencils) {

                            pencils[indexesContriesWithZones[x]].click().then(

                                getColumnNameIndex("Name")).then(function () {

                                    var cssSelecrotForZones = ".dataTable > tbody > tr > td:nth-child(" + columnIndex + ")";
                                    driver.findElements(By.css(cssSelecrotForZones)).then(function (zones) {

                                        for (var i = 0; i < zones.length - 1; i++) (function (x) {
                                            zones[x].getAttribute("textContent").then(function (zoneText) {

                                                zonesList.push(zoneText);

                                            });
                                        })(i);
                                    }).then(function () {

                                        console.log("Длина массива зон = " + zonesList.length + "\n");
                                        assert.ok(isArraySortedByAlphabet(zonesList), "Массив не отсортирован по алфавиту");
                                        console.log("Массив отсортирован по алфавиту\n");
                                        zonesList = [];
                                    }).then(

                                        driver.get('http://localhost/litecart/admin/?app=countries&doc=countries'));
                                });
                            });
                        })(i);
                });
            });
    });

    test.it('Task 9_2 - check zones alphabet', function() {
        console.log("\n-----------------Запускаем тест Task 9_2");
        var zonesList = [];
        driver.get('http://localhost/litecart/admin/?app=geo_zones&doc=geo_zones').then(

            getColumnNameIndex("Name")).then(function () {
                var cssSelecrotForCountries = ".row > td:nth-child(" + columnIndex + ")";
                driver.findElements(By.css(cssSelecrotForCountries)).then(function (countries) {

                    for (var i = 0; i < countries.length; i++) (function (x) {
                        driver.findElements(By.css(".fa.fa-pencil")).then(function (pencils) {

                            pencils[x].click().then(

                                getColumnNameIndex("Zone")).then(function () {

                                    var cssSelecrotForZones = ".dataTable > tbody > tr > td:nth-child(" + columnIndex + ") > [name*=zone] > [selected=selected]";
                                    driver.findElements(By.css(cssSelecrotForZones)).then(function (zones) {

                                        for (var i = 0; i < zones.length; i++) (function (x) {
                                            zones[x].getAttribute("textContent").then(function (zoneText) {

                                                zonesList.push(zoneText);

                                            });
                                        })(i);
                                    }).then(function () {

                                        console.log("Длина массива зон = " + zonesList.length + "\n");
                                        assert.ok(isArraySortedByAlphabet(zonesList), "Массив не отсортирован по алфавиту");
                                        console.log("Массив отсортирован по алфавиту\n");
                                        zonesList = [];
                                    }).then(

                                        driver.get('http://localhost/litecart/admin/?app=geo_zones&doc=geo_zones'));
                                });
                        });
                    })(i);
                })
            });

    });

    /**
     * Фуннкция определяющая, является ли массив отсортированным по алфавиту.
     *
     * @param {sting} columnName Массив для проверки
     * @return {bool} true, если является
     */
    function isArraySortedByAlphabet(arrayForCheck) {

        var newSortedArray = [];
        for(var i = 0; i < arrayForCheck.length; i++) {
            newSortedArray.push(arrayForCheck[i]);
        }
        newSortedArray.sort();

        for(var i = 0; i < newSortedArray.length; i++) {
            if (newSortedArray[i] !== arrayForCheck[i]) {
                return false;
            }
        }
        return true;
    }

    /**
     * Фуннкция получения индекса столбца по его заголовку.
     *
     * @param {sting} columnName Заголовк столбца
     * @return {int} index индекс столбца
     */
    function getColumnNameIndex(columnName) {

        driver.findElements(By.css("tr.header>th")).then(function(columns) {
            for(var i = 0; i < columns.length; i++) (function (x) {
                columns[x].getAttribute("textContent").then(function (columnText) {
                    if (columnText === columnName) {
                        console.log("\nИндекс стоблца " + columnText + " = " + parseInt(x + 1));
                        columnIndex = parseInt(x + 1);
                    }
                });
            })(i);
        });
    }

    test.after(function() {
        driver.sleep(2000);
        driver.quit();
    });
});
