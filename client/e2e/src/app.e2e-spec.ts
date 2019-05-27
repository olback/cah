import { AppPage } from './app.po';
import { browser } from 'protractor';
import { noBrowserErrorsCheck } from './utils';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    browser.waitForAngularEnabled(false); // TODO:FIXME:
    page = new AppPage();
  });

  it('title should be \'Chickens Attack Helicopters\'', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Chickens Attack Helicopters');
  });

  afterEach(noBrowserErrorsCheck);

});
