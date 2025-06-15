const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { describe, it, before, after } = require('mocha');
const assert = require('assert');

describe('Post a Comment on Project Page', function () {
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

  it('should submit a comment', async () => {
    await driver.get('https://sa-event.onrender.com/project1.html'); 

    await driver.findElement(By.name('username')).sendKeys('TestUser');
    await driver.findElement(By.name('comment')).sendKeys('This is a test comment from Selenium.');

    await driver.findElement(By.css('form#comment-form button[type="submit"]')).click();

    await driver.sleep(2000);

    const pageSource = await driver.getPageSource();
    assert.ok(pageSource.includes('This is a test comment from Selenium.'));
  });
});
