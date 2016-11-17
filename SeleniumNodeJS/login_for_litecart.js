var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing');

test.describe('Login Admin to literact', function() {
    var driver;

    test.before(function() {
        var options = new chrome.Options();
        options.addArguments(["start-fullscreen"]);

        driver = new webdriver.Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        driver.getCapabilities().then(function(caps) {
            console.log(caps);
        });
    });

    test.it('should do login by Admin', function() {
        driver.get('http://localhost/litecart/admin/login.php');
        driver.findElement(By.name('username')).sendKeys('admin');
        driver.findElement(By.name('password')).sendKeys('admin');
        driver.findElement(By.name('login')).click();
        driver.wait(until.titleIs('My Store'), 1000);
    });

    test.after(function() {
        driver.quit();
    });
});