import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import FrascosDeFermentosComponentsPage from './frascos-de-fermentos.page-object';
import FrascosDeFermentosUpdatePage from './frascos-de-fermentos-update.page-object';
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

describe('FrascosDeFermentos e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let frascosDeFermentosComponentsPage: FrascosDeFermentosComponentsPage;
  let frascosDeFermentosUpdatePage: FrascosDeFermentosUpdatePage;
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
    frascosDeFermentosComponentsPage = new FrascosDeFermentosComponentsPage();
    frascosDeFermentosComponentsPage = await frascosDeFermentosComponentsPage.goToPage(navBarPage);
  });

  it('should load FrascosDeFermentos', async () => {
    expect(await frascosDeFermentosComponentsPage.title.getText()).to.match(/Frascos De Fermentos/);
    expect(await frascosDeFermentosComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete FrascosDeFermentos', async () => {
    const beforeRecordsCount = (await isVisible(frascosDeFermentosComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(frascosDeFermentosComponentsPage.table);
    frascosDeFermentosUpdatePage = await frascosDeFermentosComponentsPage.goToCreateFrascosDeFermentos();
    await frascosDeFermentosUpdatePage.enterData();

    expect(await frascosDeFermentosComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(frascosDeFermentosComponentsPage.table);
    await waitUntilCount(frascosDeFermentosComponentsPage.records, beforeRecordsCount + 1);
    expect(await frascosDeFermentosComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await frascosDeFermentosComponentsPage.deleteFrascosDeFermentos();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(frascosDeFermentosComponentsPage.records, beforeRecordsCount);
      expect(await frascosDeFermentosComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(frascosDeFermentosComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
