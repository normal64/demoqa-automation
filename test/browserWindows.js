const versionMatcher = require("chromedriver-version-matcher");
const { expect } = require("chai");
const { By, Key, Builder, Select, until } = require("selenium-webdriver");
const assert = require("assert");

require("chromedriver");

const headingExpectedText = "This is a sample page";

describe("task for go phptravels", async function () {
  let driver;

  before(async function () {
    // Set up the Selenium WebDriver instance
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async function () {
    // Quit the WebDriver instance
    //await driver.quit();
  });

  it("checking new tab opening", async function () {
    // Navigate to the webpage
    driver.get("https://demoqa.com/");
    await driver.manage().window().maximize();
    //navigation to registration form
    await driver.wait(
      until.elementIsVisible(driver.findElement(By.className("card")))
    );

    const secondElement = await driver.findElement(
      By.css("div.card:nth-child(3)")
    );
    await driver.executeScript('arguments[0].scrollIntoView()', secondElement);
    await secondElement.click();

    const registrationFormLink = await driver.findElement(
      By.xpath("//*[contains(text(), 'Browser Windows')]")
    );
    registrationFormLink.click();
    // Wait until the page URL is "https://demoqa.com/browser-windows"
    await driver.wait(until.urlIs("https://demoqa.com/browser-windows"));

    const currentWindowHandle = await driver.getWindowHandle();
    const newTabButton1 = await driver.findElement(By.id("tabButton"));
    await newTabButton1.click();

    // Wait for the new tab to open
    await driver.wait(async function () {
      const windowHandles = await driver.getAllWindowHandles();
      return windowHandles.length > 1;
    });
    const windowHandles = await driver.getAllWindowHandles();
    const newWindowHandle = windowHandles.find(
      (handle) => handle !== currentWindowHandle
    );

    // Switch to the new tab
    await driver.switchTo().window(newWindowHandle);
    const newTabHeading = await driver.findElement(By.id("sampleHeading"));
    const newTabHeadingText = await newTabHeading.getText();
    //assertion
    expect(newTabHeadingText).to.equal(headingExpectedText);
  });
});
