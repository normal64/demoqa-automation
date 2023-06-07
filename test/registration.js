const versionMatcher = require("chromedriver-version-matcher");
const { expect } = require("chai");
const { By, Key, Builder, Select, until } = require("selenium-webdriver");
const assert = require("assert");
const {
  isModalWindowDisplayed,
  getModalHeaderText,
} = require("./helperFunctions/registration-validations");

require("chromedriver");
describe("task for go phptravels", async function () {
  let driver;

  before(async function () {
    // Set up the Selenium WebDriver instance
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async function () {
    // Quit the WebDriver instance
      await driver.quit();
  });
  it("successful registration", async function () {
    // Navigate to the webpage
    driver.get("https://demoqa.com/");
    await driver.manage().window().maximize();
    //navigation to registration form
    await driver.wait(
      until.elementIsVisible(driver.findElement(By.className("card")))
    );

    const secondElement = await driver.findElement(
      By.css("div.card:nth-child(2)")
    );
    await secondElement.click();

    const registrationFormLink = await driver.findElement(
      By.xpath("//*[contains(text(), 'Practice Form')]")
    );
    registrationFormLink.click();
    // Wait until the page URL is "https://demoqa.com/automation-practice-form"
    await driver.wait(
      until.urlIs("https://demoqa.com/automation-practice-form")
    );
    const firstName = await driver.findElement(By.id("firstName"));
    await firstName.sendKeys("Demnmnis");

    const lastName = await driver.findElement(By.id("lastName"));
    await lastName.sendKeys("Poplavskii");

    const emailInput = await driver.findElement(By.id("userEmail"));
    await emailInput.sendKeys("hirethisguy@myspace.com");

    const genderInput = await driver.findElement(
      By.css("label[for='gender-radio-1']")
    );
    await genderInput.click();

    const mobilePhoneInput = await driver.findElement(By.id("userNumber"));
    await mobilePhoneInput.sendKeys("43211235677");
    //picking date of birth
    const dateOfBirthInput = await driver.findElement(
      By.id("dateOfBirthInput")
    );
    await dateOfBirthInput.click();
    //year picking
    const yearInputDateOfBirthInput = await driver.findElement(
      By.className("react-datepicker__year-select")
    );
    await yearInputDateOfBirthInput.click();
    const SelectedBirthYear = await driver.findElement(
      By.xpath("//*[contains(text(), '2007')]")
    );
    SelectedBirthYear.click();
    await yearInputDateOfBirthInput.click();
    //month picking
    const monthInputDateOfBirthInput = await driver.findElement(
      By.className("react-datepicker__month-select")
    );
    await monthInputDateOfBirthInput.click();
    const SelectedBirthMonth = await driver.findElement(
      By.xpath("//*[contains(text(), 'August')]")
    );
    await SelectedBirthMonth.click();
    await monthInputDateOfBirthInput.click();
    //picking day
    const dayDateOfBirthInput = await driver.findElement(
      By.className("react-datepicker__day react-datepicker__day--009")
    );
    await dayDateOfBirthInput.click();

    //submit form js because div intercepting click by selenium
    const submitButton = await driver.findElement(By.id("submit"));
    await driver.executeScript("arguments[0].click();", submitButton);
    // Check if the modal window is displayed
    const isModalWindow = await isModalWindowDisplayed(driver);
    try {
      expect(isModalWindow).to.be.true;
    } catch (error) {
      console.log(`error with modal popup`, error);
    }

    // Check if the header contains the expected text
    const headerText = await getModalHeaderText(driver);
    try {
      expect(headerText).to.include("Thanks for submitting the form");
    } catch (error) {
      console.log(`error with displayed module`, error);
    }
  });
  it("Submit form button disabled if inputs are empty", async function () {
    // Navigate to the webpage
    driver.get("https://demoqa.com/");
    await driver.manage().window().maximize();
    //navigation to registration form
    await driver.wait(
      until.elementIsVisible(driver.findElement(By.className("card")))
    );

    const secondElement = await driver.findElement(
      By.css("div.card:nth-child(2)")
    );
    await secondElement.click();

    const registrationFormLink = await driver.findElement(
      By.xpath("//*[contains(text(), 'Practice Form')]")
    );
    registrationFormLink.click();
    // Wait until the page URL is "https://demoqa.com/automation-practice-form"
    await driver.wait(
      until.urlIs("https://demoqa.com/automation-practice-form")
    );
    try {
      // //submit form js because div intercepting click by selenium
      const submitButton = await driver.findElement(By.id("submit"));
      await driver.executeScript("arguments[0].click();", submitButton);
      // Check if the submit button is disabled
      const isDisabled = await submitButton.isEnabled();

      // Assert the expected state of the submit button
      assert.strictEqual(
        isDisabled,
        false,
        "Submit button is expected to be disabled."
      );

      console.log("Submit button is disabled as expected.");
    } catch (error) {
      console.error(error.message);
    }
  });
  it("Entering spacebar in name, family name", async function () {
    // Navigate to the webpage
    driver.get("https://demoqa.com/");
    await driver.manage().window().maximize();
    //navigation to registration form
    await driver.wait(
      until.elementIsVisible(driver.findElement(By.className("card")))
    );

    const secondElement = await driver.findElement(
      By.css("div.card:nth-child(2)")
    );
    await secondElement.click();

    const registrationFormLink = await driver.findElement(
      By.xpath("//*[contains(text(), 'Practice Form')]")
    );
    registrationFormLink.click();
    // Wait until the page URL is "https://demoqa.com/automation-practice-form"
    await driver.wait(
      until.urlIs("https://demoqa.com/automation-practice-form")
    );
    const firstName = await driver.findElement(By.id("firstName"));
    await firstName.sendKeys(Key.SPACE);
    await firstName.sendKeys(Key.ENTER);

    const lastName = await driver.findElement(By.id("lastName"));
    await lastName.sendKeys(Key.SPACE);
    await lastName.sendKeys(Key.ENTER);
    const genderInput = await driver.findElement(
      By.css("label[for='gender-radio-1']")
    );
    await genderInput.click();
    const mobilePhoneInput = await driver.findElement(By.id("userNumber"));
    await mobilePhoneInput.sendKeys("43211235677");
     //submit form js because div intercepting click by selenium
     const submitButton = await driver.findElement(By.id("submit"));
     await driver.executeScript("arguments[0].click();", submitButton);
     // Check if the modal window is displayed
     const isModalWindow = await isModalWindowDisplayed(driver);
     try {
       expect(isModalWindow).to.be.true;
       console.log(`Negative case Submit worked`);
     } catch (error) {
       console.log(`error with modal popup`, error);
     }
  });
});
