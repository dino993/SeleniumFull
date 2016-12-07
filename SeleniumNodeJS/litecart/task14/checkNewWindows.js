var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    safari = require('selenium-webdriver/safari'),
    phantomjs = require('selenium-webdriver/phantomjs'),
    firefox = require('selenium-webdriver/firefox'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing'),
    generalParameters = require('./../generalParameters'),
    dateFormat = require('dateformat'),
    Condition = webdriver.Condition,
    WebElementCondition = webdriver.WebElementCondition;

test.describe('Task 14', function() {
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

    test.it('Task 3 - should do login by Admin', function() {
        driver.get('http://localhost/litecart/admin/login.php');
        driver.findElement(By.name('username')).sendKeys(generalParameters.authorithation.admin.login);
        driver.findElement(By.name('password')).sendKeys(generalParameters.authorithation.admin.password);
        driver.findElement(By.name('login')).click();
        driver.wait(until.titleIs('My Store'), 1000);
    });

    test.it('Task 14 - check new window', function() {

        driver.get("http://localhost/litecart/admin/?app=countries&doc=countries");

        driver.findElement(By.xpath("//*[text()=' Add New Country']")).click();

        driver.findElements(By.className("fa fa-external-link")).then(function(externalLink){
            console.log("Всего найдено внешних ссылок = " + externalLink.length + "\n");

            driver.getWindowHandle().then(function(mainWindow){

                for(var i = 0; i < externalLink.length; i++) (function (x) {

                    driver.getAllWindowHandles().then(function(oldWindows){

                        driver.actions().mouseMove(externalLink[x]).sendKeys(webdriver.Key.SHIFT).click().perform().then(function(){
                            driver.wait(untilThereIsOtherWindow(), 5000).then(function(){
                                getUniqueWindow(oldWindows).then(function(newWindow){
                                    driver.switchTo().window(newWindow);
                                    driver.close();
                                    driver.switchTo().window(mainWindow);
                                    console.log("Окно " + x + " = " + newWindow + " открылось и закрылось\n");
                                });
                            });
                        });

                    });
                })(i);
            });
        });
    });


    function untilThereIsOtherWindow() {

        return new Condition(
            'until new window present',
            function(driver) {
                return driver.getAllWindowHandles().then(function(result) {
                    return result.length === 2;
                });
            });

    };

    function getUniqueWindow(oldWindows) {
        return driver.getAllWindowHandles().then(function(result){
                for (var i = 0; i < oldWindows.length; i++) {
                    var str = oldWindows[i];
                    for (var j = 0; j < result.length; j++) {
                        if (result[j] !== str) {
                            return result[j];
                        }
                    }
                }
        });

    }

    test.after(function() {
        driver.sleep(2000);
        driver.quit();
    });
});
