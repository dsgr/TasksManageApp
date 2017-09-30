import {browser, by, element} from 'protractor';

describe('Login test', () => {
  it("should open login page", () => {
    browser.get("#/login");
    expect(element(by.css("h3")).getText()).toEqual("Авторизация");
  });

  it("should login", () => {
    element(by.css("input[name=username]")).sendKeys("admin");
    element(by.css("input[name=password]")).sendKeys("admin");
    element(by.css("#login-button")).click();
    expect(element(by.css("h2")).getText()).toEqual("TasksManageApp");
  });
});
