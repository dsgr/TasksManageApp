import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getH2Text() {
    return element(by.css('h2')).getText();
  }
}
