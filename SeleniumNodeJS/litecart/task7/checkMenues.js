var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    safari = require('selenium-webdriver/safari'),
    phantomjs = require('selenium-webdriver/phantomjs'),
    firefox = require('selenium-webdriver/firefox'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing'),
    generalParameters = require('./../generalParameters');

test.describe('Task 7', function() {
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

    test.it('Task 7 - check menues', function() {

        var expectedMenues = generalParameters.expectedMenues;

        // Обход главного меню.
        for(var i = 0; i < expectedMenues.length; i++) {

            var menues = driver.findElement(By.xpath("//*[text()=" + expectedMenues[i].main + "]"));
            menues.getText().then(function(text) {
                console.log("Главное меню = " + text);
            });
            menues.click();

            if (expectedMenues[i].inserted.length === 0) {
                checkTitle(expectedMenues[i].expectedTitles[0]);
            } else {
                // Обход подменю.
                for(var j = 0; j < expectedMenues[i].inserted.length; j++) {

                    var subMenues = driver.findElement(By.xpath("//span[@class='name'][text()=" + expectedMenues[i].inserted[j] + "]"));
                    subMenues.getText().then(function(text) {
                        console.log("---Вложенное меню = " + text);
                    });
                    subMenues.click();

                    checkTitle(expectedMenues[i].expectedTitles[j]);
                }
            }
        }

    });

    /**
     * Фуннкция проверяет наличие заголовка и выводит его текст.
     *
     * @param {sting} title Ожтдаемый заголовк
     * @return {void}
     */
    function checkTitle(title) {
        // Проверка наличия заголовка и его текста
        driver.findElement(By.xpath("//h1[text()=" + title + "]")).then(function (titles) {
            titles.getText().then(function (text) {
                console.log("---------Найден Заголовк = " + text);
            });
        });
    }


    test.it('Task 8 - check  is sticker  single', function() {

    });

    test.after(function() {
        driver.sleep(2000);
        driver.quit();
    });
});
