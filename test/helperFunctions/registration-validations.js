// registration-validations.js
const { By } = require("selenium-webdriver");
const { expect } = require("chai");

async function isModalWindowDisplayed(driver) {
  const modalWindow = await driver.findElement(By.className("modal-dialog modal-lg"));
  return await modalWindow.isDisplayed();
}

async function getModalHeaderText(driver) {
  const headerElement = await driver.findElement(By.id("example-modal-sizes-title-lg"));
  return await headerElement.getText();
}

module.exports = {
  isModalWindowDisplayed,
  getModalHeaderText,
};
