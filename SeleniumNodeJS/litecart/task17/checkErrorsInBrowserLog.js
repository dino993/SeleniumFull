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
    fs = require('fs');

test.describe('Task 17', function() {
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
          //  console.log(caps);
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

    var ducks = ["Blue Duck", "Green Duck", "Purple Duck", "Red Duck", "Yellow Duck"];

    test.it('Task 17 - check Errors In Browser Log', function() {

            for(var i = 0; i < ducks.length; i++) (function (x) {
                driver.get('http://localhost/litecart/admin/?app=catalog&doc=catalog&category_id=1').then(function(){
                    driver.findElement(By.xpath("//*[text()='" + ducks[x] + "']")).click();

                    driver.manage().logs().get("browser").then(function(logsEntries) {
                        logsEntries.forEach(function(l) {
                            console.log(l)
                        });
                    });

                    
                    driver.takeScreenshot().then(
                        function(image) {
                            fs.writeFile('screen' + x + '.png', image, 'base64', function(err) {
                                console.log(err);
                            });
                        }
                    );
                });
            })(i);
    });



    test.after(function() {
        driver.sleep(2000);
        driver.quit();
    });
});
