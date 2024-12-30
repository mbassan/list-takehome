import { Page } from 'puppeteer';
import { CFG } from 'cfg';
import { Browser } from 'service';

function gotoLoginPage(browser: Browser) {
  return browser.goto(CFG.APP.LOGIN_PAGE);
}

async function enterLoginInfo(page: Page) {
  await page.locator('#input-6').fill(CFG.APP.LOGIN_USER);
  await page.locator('#input-8').fill(CFG.APP.LOGIN_PASS);
}

function submitLoginInfo(page: Page) {
  return page.locator('lightning-button:last').click();
}

export async function runLogin(browser: Browser) {
  await gotoLoginPage(browser);
  await enterLoginInfo(browser.page);
  await submitLoginInfo(browser.page);
}
