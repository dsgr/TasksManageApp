import { AppPage } from './app.po';

describe('Load app test', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display homepage', () => {
    page.navigateTo();
    expect(page.getH2Text()).toEqual('TasksManageApp');
  });


});
