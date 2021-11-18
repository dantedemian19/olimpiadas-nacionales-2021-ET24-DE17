import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import LechesComponentsPage from './leches.page-object';
import LechesUpdatePage from './leches-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('Leches e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let lechesComponentsPage: LechesComponentsPage;
  let lechesUpdatePage: LechesUpdatePage;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();
    await signInPage.username.sendKeys(username);
    await signInPage.password.sendKeys(password);
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    lechesComponentsPage = new LechesComponentsPage();
    lechesComponentsPage = await lechesComponentsPage.goToPage(navBarPage);
  });

  it('should load Leches', async () => {
    expect(await lechesComponentsPage.title.getText()).to.match(/Leches/);
    expect(await lechesComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Leches', async () => {
    const beforeRecordsCount = (await isVisible(lechesComponentsPage.noRecords)) ? 0 : await getRecordsCount(lechesComponentsPage.table);
    lechesUpdatePage = await lechesComponentsPage.goToCreateLeches();
    await lechesUpdatePage.enterData();

    expect(await lechesComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(lechesComponentsPage.table);
    await waitUntilCount(lechesComponentsPage.records, beforeRecordsCount + 1);
    expect(await lechesComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await lechesComponentsPage.deleteLeches();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(lechesComponentsPage.records, beforeRecordsCount);
      expect(await lechesComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(lechesComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
