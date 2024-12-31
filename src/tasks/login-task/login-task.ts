import { cwd } from 'process';
import { Page } from 'puppeteer';
import { CFG } from 'cfg';
import { Browser, logger } from 'service';
import { SELECTORS } from './selectors';
import { CSS_CLASS, CSS_CLASS_NAME } from './constants';
import { sleep } from 'utils';

function gotoLoginPage(browser: Browser) {
  logger.info(`Navigating to ${CFG.APP.LOGIN.PAGE}`);
  return browser.goto(CFG.APP.LOGIN.PAGE);
}

async function enterLoginInfo(page: Page) {
  logger.info('Entering user info');
  await page.locator(SELECTORS.LOGIN_PAGE.USER_INPUT).fill(CFG.APP.LOGIN.USER);
  await page.locator(SELECTORS.LOGIN_PAGE.PASS_INPUT).fill(CFG.APP.LOGIN.PASS);
}

async function submitLoginInfo(page: Page) {
  logger.info('Logging in...');
  await page.locator(SELECTORS.LOGIN_PAGE.LOGIN_BUTTON).click();
  await page.waitForNavigation({ waitUntil: 'networkidle2' });
  logger.info('Logged in succesfully.');
}

export async function runLogin(browser: Browser) {
  await gotoLoginPage(browser);
  await enterLoginInfo(browser.page);
  await submitLoginInfo(browser.page);
}

export async function injectUserInfo(browser: Browser) {
  logger.info('Injecting user info to DOM...');
  const selector = SELECTORS.HOME_PAGE.HEADER_ELEM;
  const html = `${CFG.APP.USER.FIRST_NAME} ${CFG.APP.USER.LAST_NAME}`;

  await sleep(5 * 1000);
  browser.page.waitForSelector(SELECTORS.HOME_PAGE.MY_ACCOUNT_BUTTON);

  return browser.page.evaluate(
    (selector, html, styleName, styles) => {
      const style = document.createElement('style');
      style.textContent = styles;
      document.head.appendChild(style);

      const targetElement = document.querySelector(selector);

      const injectedElem = document.createElement('div');
      injectedElem.innerHTML = html;
      injectedElem.classList.add(styleName);
      targetElement?.insertAdjacentElement('afterend', injectedElem);
    },
    selector,
    html,
    CSS_CLASS_NAME,
    CSS_CLASS
  );
}

export async function exportToPdf(browser: Browser) {
  logger.info('Exporting PDF...');
  await browser.page.pdf({
    format: 'A4',
    printBackground: true,
    path: `${cwd()}/output/screenshot.pdf`,
  });
}
