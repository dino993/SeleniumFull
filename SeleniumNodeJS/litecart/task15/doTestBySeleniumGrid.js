var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    safari = require('selenium-webdriver/safari'),
    phantomjs = require('selenium-webdriver/phantomjs'),
    firefox = require('selenium-webdriver/firefox'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing'),
    generalParameters = require('./../generalParameters');

var options = new chrome.Options();
options.addArguments(["start-fullscreen"]);

test.describe('Task 15 - Remote WIN', function() {
    var driver;

    test.before(function() {
        driver = new webdriver.Builder()
            .usingServer("http://192.168.1.61:4444/wd/hub")
            .withCapabilities({
                browserName: 'chrome',
                platfom: 'WIN10'

            })
            .setChromeOptions(options)
            .build();
        driver.manage().timeouts().implicitlyWait(10000/*ms*/);
    });

    test.it('Task 15', function() {

        driver.get('http://www.google.com');
        driver.findElement(webdriver.By.name('q')).sendKeys('BrowserStack');
        driver.findElement(webdriver.By.name('btnG')).click();

        driver.getTitle().then(function(title) {
            console.log(title);
        });

    });

    test.after(function() {
        driver.sleep(2000);
        driver.quit();
    });
});

test.describe('Task 15 - MAC', function() {
    var driver;

    test.before(function() {

        driver = new webdriver.Builder()
            .usingServer("http://192.168.1.61:4444/wd/hub")
            .withCapabilities({
                browserName: 'chrome',
                platfom: 'MAC'

            })
            .setChromeOptions(options)
            .build();
            driver.manage().timeouts().implicitlyWait(10000/*ms*/);

    });

    test.it('Task 15', function() {

        driver.get('http://www.google.com');
        driver.findElement(webdriver.By.name('q')).sendKeys('BrowserStack');
        driver.findElement(webdriver.By.name('btnG')).click();

        driver.getTitle().then(function(title) {
            console.log(title);
        });

    });

    test.after(function() {
        driver.sleep(2000);
        driver.quit();
    });
});