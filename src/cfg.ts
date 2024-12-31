export const CFG = {
  BROWSER: {
    HEADLESS: process.env.BROWSER_HEADLESS?.toLocaleLowerCase() === 'true',
  },
  APP: {
    LOGIN: {
      PAGE: process.env.APP_LOGIN_PAGE ?? '',
      USER: process.env.APP_LOGIN_USER ?? '',
      PASS: process.env.APP_LOGIN_PASS ?? '',
    },
    USER: {
      FIRST_NAME: process.env.APP_USER_FIRST_NAME ?? '',
      LAST_NAME: process.env.APP_USER_LAST_NAME ?? '',
    },
  },
};
