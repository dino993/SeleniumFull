var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    safari = require('selenium-webdriver/safari'),
    phantomjs = require('selenium-webdriver/phantomjs'),
    firefox = require('selenium-webdriver/firefox'),
    By = webdriver.By,
    until = webdriver.until,
    test = require('selenium-webdriver/testing'),
    generalParameters = require('./../generalParameters'),
    dateFormat = require('dateformat');

test.describe('Task 12', function() {
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

    test.it('Task 12 - add new product', function() {

        driver.findElement(By.xpath("//*[text()='Catalog']")).click();
        driver.findElement(By.xpath("//*[@class='button'][text()=' Add New Product']")).click();

        var productName = "MyNewProduct";
        // Заполняем вкладку General
        driver.findElement(By.name("status")).click();
        driver.findElement(By.name("name[en]")).sendKeys(productName);
        driver.findElement(By.name("code")).sendKeys("1234567");
        driver.findElement(By.css("[name='categories[]'][value='1']")).click();
        driver.findElement(By.css("[name='product_groups[]'][value='1-1']")).click();

        var quantityField = driver.findElement(By.css("[name='quantity']"));
        quantityField.clear();
        quantityField.sendKeys("2");

        driver.findElement(By.xpath("//option[text()='Temporary sold out']")).click();

        var filePath = __dirname.split("litecart")[0] + "input/test.docx";
        driver.findElement(By.name("new_images[]")).sendKeys(filePath);

        var now = new Date();
        var today = dateFormat(now, "dd, mm, yyyy");
        driver.findElement(By.name("date_valid_from")).sendKeys(today);
        driver.findElement(By.name("date_valid_to")).sendKeys(today);

        // Заполняем вкладку Information
        driver.findElement(By.css("[href='#tab-information']")).click();

        driver.findElement(By.xpath("//option[text()='ACME Corp.']")).click();
        driver.findElement(By.name("keywords")).sendKeys("My Keywords");
        driver.findElement(By.name("short_description[en]")).sendKeys("My Short Description");
        driver.findElement(By.className("trumbowyg-editor")).sendKeys("My Description");
        driver.findElement(By.name("head_title[en]")).sendKeys("My Head Title");
        driver.findElement(By.name("meta_description[en]")).sendKeys("My Meta Description");

        // Заполняем вкладку Price
        driver.findElement(By.css("[href='#tab-prices']")).click();

        var purchasePrise = driver.findElement(By.name("purchase_price"));
        purchasePrise.clear();
        purchasePrise.sendKeys("1");

        driver.findElement(By.xpath("//option[text()='US Dollars']")).click();
        driver.findElement(By.name("prices[USD]")).sendKeys("1");

        // Сохраняем.
        driver.findElement(By.name("save")).click();

        // Проверка, что товар создался
        driver.findElement(By.xpath("//*[text()='Catalog']")).click();
        driver.findElement(By.xpath("//*[text()='" + productName + "']")).click();

        // Удаляем, чтбы не засорять базу
        driver.findElement(By.name("delete")).click();
        driver.switchTo().alert().accept();

    });

    test.after(function() {
        driver.sleep(2000);
        driver.quit();
    });
});
