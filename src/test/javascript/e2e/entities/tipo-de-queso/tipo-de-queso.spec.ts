import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TipoDeQuesoComponentsPage from './tipo-de-queso.page-object';
import TipoDeQuesoUpdatePage from './tipo-de-queso-update.page-object';
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

describe('TipoDeQueso e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tipoDeQuesoComponentsPage: TipoDeQuesoComponentsPage;
  let tipoDeQuesoUpdatePage: TipoDeQuesoUpdatePage;
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
    tipoDeQuesoComponentsPage = new TipoDeQuesoComponentsPage();
    tipoDeQuesoComponentsPage = await tipoDeQuesoComponentsPage.goToPage(navBarPage);
  });

  it('should load TipoDeQuesos', async () => {
    expect(await tipoDeQuesoComponentsPage.title.getText()).to.match(/Tipo De Quesos/);
    expect(await tipoDeQuesoComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete TipoDeQuesos', async () => {
    const beforeRecordsCount = (await isVisible(tipoDeQuesoComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(tipoDeQuesoComponentsPage.table);
    tipoDeQuesoUpdatePage = await tipoDeQuesoComponentsPage.goToCreateTipoDeQueso();
    await tipoDeQuesoUpdatePage.enterData();

    expect(await tipoDeQuesoComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(tipoDeQuesoComponentsPage.table);
    await waitUntilCount(tipoDeQuesoComponentsPage.records, beforeRecordsCount + 1);
    expect(await tipoDeQuesoComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await tipoDeQuesoComponentsPage.deleteTipoDeQueso();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(tipoDeQuesoComponentsPage.records, beforeRecordsCount);
      expect(await tipoDeQuesoComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(tipoDeQuesoComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
