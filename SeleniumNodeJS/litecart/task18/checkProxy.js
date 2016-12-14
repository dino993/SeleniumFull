/**
 * Created by dino993 on 13.12.16.
 */
var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    safari = require('selenium-webdriver/safari'),
    phantomjs = require('selenium-webdriver/phantomjs'),
    firefox = require('selenium-webdriver/firefox'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing'),
    generalParameters = require('./../generalParameters'),
    fs = require('fs'),
    proxy = require('selenium-webdriver/proxy');

test.describe('Task 18', function() {
    var driver;

    test.before(function() {
        var options = new chrome.Options();
        options.addArguments(["start-fullscreen"]);

        driver = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.chrome())
            .setProxy(proxy.manual({http: 'localhost:8888'}))
            .setChromeOptions(options)
            .build();

        driver.getCapabilities().then(function(caps) {
            console.log(caps);
            driver.manage().timeouts().implicitlyWait(10000/*ms*/);
        });
    });

    test.it('Task 18 - check Proxy', function() {

        driver.get('http://selenium2.ru');
    });

    test.after(function() {
        driver.sleep(2000);
        driver.quit();
    });
});
