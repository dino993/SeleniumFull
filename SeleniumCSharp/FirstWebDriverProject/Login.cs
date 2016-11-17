using NUnit.Framework;
using System;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;

namespace FirstWebDriverProject
{
	[TestFixture()]
	public class Login : BaseTest
	{
		[Test()]
		public void TestCase()
		{
			driver.Url = "http://localhost/litecart/admin/login.php";
			driver.FindElement(By.Name("username")).SendKeys("admin");
			driver.FindElement(By.Name("password")).SendKeys("admin");
			driver.FindElement(By.Name("login")).Click();
			wait.Until(ExpectedConditions.TitleIs("My Store"));
		}
	}
}

