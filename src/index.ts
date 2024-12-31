import 'dotenv/config';
import { browser } from 'service';
import { loginTask } from 'tasks';

async function init() {
  await browser.init();
  await loginTask.runLogin(browser);
  await loginTask.injectUserInfo(browser);
  await loginTask.exportToPdf(browser);
  process.exit();
}

init();
