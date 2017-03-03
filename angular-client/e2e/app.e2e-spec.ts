import { DevManager.AppPage } from './app.po';

describe('dev-manager.app App', () => {
  let page: DevManager.AppPage;

  beforeEach(() => {
    page = new DevManager.AppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
