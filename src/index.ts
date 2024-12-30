import 'dotenv/config';
import { browser } from 'service';
import { loginTask } from 'tasks';

async function init() {
  await browser.init();
  await loginTask.runLogin(browser);
}

init();
