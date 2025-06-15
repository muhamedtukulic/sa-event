const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { describe, it, before, after } = require('mocha');
const assert = require('assert');

describe('Signup Page Test', function () {
  this.timeout(30000); 

  let driver;

  before(async () => {
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(new chrome.Options().addArguments('--headless=new'))
      .build();
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it('should fill and submit the signup form', async () => {
    await driver.get('https://sa-event.onrender.com/signup.html');

    await driver.findElement(By.name('name')).sendKeys('Test');
    await driver.findElement(By.name('surname')).sendKeys('User');
    await driver.findElement(By.name('email')).sendKeys('testuser@example.com');
    await driver.findElement(By.name('password')).sendKeys('password123');
    await driver.findElement(By.name('confirm_password')).sendKeys('password123');

    await driver.findElement(By.css('input[type="submit"]')).click();

    await driver.sleep(1500); 
    
    const bodyHTML = await driver.findElement(By.tagName('body')).getAttribute('innerHTML');
    assert.ok(bodyHTML.includes('Data saved successfully!'));
  });
});
