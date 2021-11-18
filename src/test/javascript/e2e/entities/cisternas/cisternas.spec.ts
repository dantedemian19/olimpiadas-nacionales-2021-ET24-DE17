import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CisternasComponentsPage from './cisternas.page-object';
import CisternasUpdatePage from './cisternas-update.page-object';
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

describe('Cisternas e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let cisternasComponentsPage: CisternasComponentsPage;
  let cisternasUpdatePage: CisternasUpdatePage;
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
    cisternasComponentsPage = new CisternasComponentsPage();
    cisternasComponentsPage = await cisternasComponentsPage.goToPage(navBarPage);
  });

  it('should load Cisternas', async () => {
    expect(await cisternasComponentsPage.title.getText()).to.match(/Cisternas/);
    expect(await cisternasComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Cisternas', async () => {
    const beforeRecordsCount = (await isVisible(cisternasComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(cisternasComponentsPage.table);
    cisternasUpdatePage = await cisternasComponentsPage.goToCreateCisternas();
    await cisternasUpdatePage.enterData();

    expect(await cisternasComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(cisternasComponentsPage.table);
    await waitUntilCount(cisternasComponentsPage.records, beforeRecordsCount + 1);
    expect(await cisternasComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await cisternasComponentsPage.deleteCisternas();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(cisternasComponentsPage.records, beforeRecordsCount);
      expect(await cisternasComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(cisternasComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
