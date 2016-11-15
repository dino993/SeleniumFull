using NUnit.Framework;
using System;
using OpenQA.Selenium;
using OpenQA.Selenium.Support.UI;

namespace FirstWebDriverProject
{
	[TestFixture()]
	public class Test : BaseTest
	{
		[Test()]
		public void TestCase()
		{
			driver.Url = "http://www.google.com/";
			driver.FindElement(By.Name("q")).SendKeys("webdriver");
			driver.FindElement(By.Name("btnG")).Click();
			wait.Until(ExpectedConditions.TitleIs("webdriver - Поиск в Google"));
		}
	}
}

