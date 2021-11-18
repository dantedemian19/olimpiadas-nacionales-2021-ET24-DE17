import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import SalidasDeAlmacenComponentsPage from './salidas-de-almacen.page-object';
import SalidasDeAlmacenUpdatePage from './salidas-de-almacen-update.page-object';
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

describe('SalidasDeAlmacen e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let salidasDeAlmacenComponentsPage: SalidasDeAlmacenComponentsPage;
  let salidasDeAlmacenUpdatePage: SalidasDeAlmacenUpdatePage;
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
    salidasDeAlmacenComponentsPage = new SalidasDeAlmacenComponentsPage();
    salidasDeAlmacenComponentsPage = await salidasDeAlmacenComponentsPage.goToPage(navBarPage);
  });

  it('should load SalidasDeAlmacens', async () => {
    expect(await salidasDeAlmacenComponentsPage.title.getText()).to.match(/Salidas De Almacens/);
    expect(await salidasDeAlmacenComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete SalidasDeAlmacens', async () => {
    const beforeRecordsCount = (await isVisible(salidasDeAlmacenComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(salidasDeAlmacenComponentsPage.table);
    salidasDeAlmacenUpdatePage = await salidasDeAlmacenComponentsPage.goToCreateSalidasDeAlmacen();
    await salidasDeAlmacenUpdatePage.enterData();

    expect(await salidasDeAlmacenComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(salidasDeAlmacenComponentsPage.table);
    await waitUntilCount(salidasDeAlmacenComponentsPage.records, beforeRecordsCount + 1);
    expect(await salidasDeAlmacenComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await salidasDeAlmacenComponentsPage.deleteSalidasDeAlmacen();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(salidasDeAlmacenComponentsPage.records, beforeRecordsCount);
      expect(await salidasDeAlmacenComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(salidasDeAlmacenComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
