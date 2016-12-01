var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    safari = require('selenium-webdriver/safari'),
    phantomjs = require('selenium-webdriver/phantomjs'),
    firefox = require('selenium-webdriver/firefox'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing'),
    generalParameters = require('./../generalParameters');

test.describe('Task 11', function() {
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

    var emailPrefix = generalParameters.XGenerate.randString(5);
    var email = emailPrefix + "@mail.ru";
    var password = 1234567;

    test.it('Task 11 - do registration', function() {

        driver.get("http://localhost/litecart/en/create_account");

        driver.findElement(By.name("firstname")).sendKeys("MyName");
        driver.findElement(By.name("lastname")).sendKeys("MySername");
        driver.findElement(By.name("address1")).sendKeys("MyAddress");
        driver.findElement(By.name("postcode")).sendKeys("MyPostcode");
        driver.findElement(By.name("city")).sendKeys("MyCity");

        driver.findElement(By.css(".select2-selection.select2-selection--single")).click();
        driver.findElement(By.xpath("//*[@class='select2-results__option'][text()='Albania']")).click();

        driver.findElement(By.name("email")).sendKeys(email);
        driver.findElement(By.name("phone")).sendKeys("+79169999999");
        driver.findElement(By.name("password")).sendKeys(password);
        driver.findElement(By.name("confirmed_password")).sendKeys(password);

        driver.findElement(By.name("create_account")).click();

        driver.findElement(By.xpath("//*[text()='Logout']")).click();

        driver.findElement(By.name('email')).sendKeys(email);
        driver.findElement(By.name('password')).sendKeys(password);
        driver.findElement(By.name('login')).click();
        driver.wait(until.titleIs('My Store'), 1000);

    });

    test.after(function() {
        driver.sleep(2000);
        driver.quit();
    });
});
