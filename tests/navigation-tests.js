const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { describe, it, before, after } = require('mocha');

describe('Navigation Test: Home to Events', function () {
  this.timeout(20000);
  let driver;

  before(async () => {
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(new chrome.Options().addArguments('--headless'))
      .build();
  });

  it('should navigate from home page to events page', async () => {
    await driver.get('https://sa-event.onrender.com/');

    await driver.findElement(By.linkText('Events')).click();

    await driver.wait(until.urlContains('events'), 5000); 

    const title = await driver.getTitle();
    console.log('Page title after navigation:', title);
  });

  after(async () => {
    await driver.quit();
  });
});
