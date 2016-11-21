using System;
using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Safari;
using OpenQA.Selenium.PhantomJS;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Support.UI;

namespace FirstWebDriverProject
{
	[TestFixture]
	public class BaseTest
	{
		public IWebDriver driver;
		public WebDriverWait wait;

		[SetUp]
		public void SetupDriver()
		{
			driver = new ChromeDriver();
			//driver = new SafariDriver();
			//driver = new PhantomJSDriver();
			//driver = new FirefoxDriver();

			wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
		}

		[TearDown]
		public void CloseDriver()
		{
			driver.Quit();
			driver = null;
		}

	}
}

