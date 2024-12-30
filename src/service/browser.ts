import { CFG } from 'cfg';
import puppeteer from 'puppeteer-extra';
import stealth from 'puppeteer-extra-plugin-stealth';
import { Browser as PuppeteerBrowser, Page } from 'puppeteer';
import { logger } from 'service';

export class Browser {
  private browser!: PuppeteerBrowser;
  page!: Page;

  async init() {
    logger.info('Initializing browser...');
    puppeteer.use(stealth());
    this.browser = await puppeteer.launch({ headless: CFG.BROWSER.HEADLESS });
    this.page = await this.browser.newPage();
    return true;
  }

  goto(url: string) {
    return this.page.goto(url);
  }
}

export const browser = new Browser();
