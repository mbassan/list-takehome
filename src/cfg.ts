export const CFG = {
  BROWSER: {
    HEADLESS: process.env.BROWSER_HEADLESS?.toLocaleLowerCase() === 'true',
  },
  APP: {
    LOGIN_PAGE: process.env.APP_LOGIN_PAGE ?? '',
    LOGIN_USER: process.env.APP_LOGIN_USER ?? '',
    LOGIN_PASS: process.env.APP_LOGIN_PASS ?? '',
  },
};
