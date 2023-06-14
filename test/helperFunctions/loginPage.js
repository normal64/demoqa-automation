const { By } = require("selenium-webdriver");

class LoginPage {
  constructor(driver) {
    this.driver = driver;
  }

  async login(username, surname, email) {
    // Find the username input element
    const usernameInput = await this.driver.findElement(By.id("firstName"));
    // Enter the username
    await usernameInput.sendKeys(username);

    // Find the lastname input element
    const lastName = await this.driver.findElement(By.id("lastName"));
    //enter value
    await lastName.sendKeys(surname);

    // Find the password input element
    const userEmail = await this.driver.findElement(By.id("userEmail"));
    // Enter the password
    await userEmail.sendKeys(email);

    
  }
}

module.exports = LoginPage;