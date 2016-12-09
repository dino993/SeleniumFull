var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    safari = require('selenium-webdriver/safari'),
    phantomjs = require('selenium-webdriver/phantomjs'),
    firefox = require('selenium-webdriver/firefox'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing'),
    generalParameters = require('./../generalParameters');

test.describe('Task 16', function() {
    var driver;

    test.before(function() {
        // Input capabilities
        var capabilities = {
            'browserName' : 'chrome',
            'version' : '55',
            'platform' : 'WINDOWS',
            'browserstack.user' : 'selenium17',
            'browserstack.key' : 'xViKduAzMVpg7xMAn8pu',
            'browserstack.debug' : 'true',
            'build' : 'First build'
        }

          driver = new webdriver.Builder().
            usingServer('http://hub-cloud.browserstack.com/wd/hub').
            withCapabilities(capabilities).
            build();
    });

    test.it('Task 16 - do test in selenium cloud', function() {

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
