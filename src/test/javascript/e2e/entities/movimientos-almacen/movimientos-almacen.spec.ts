import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import MovimientosAlmacenComponentsPage from './movimientos-almacen.page-object';
import MovimientosAlmacenUpdatePage from './movimientos-almacen-update.page-object';
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

describe('MovimientosAlmacen e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let movimientosAlmacenComponentsPage: MovimientosAlmacenComponentsPage;
  let movimientosAlmacenUpdatePage: MovimientosAlmacenUpdatePage;
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
    movimientosAlmacenComponentsPage = new MovimientosAlmacenComponentsPage();
    movimientosAlmacenComponentsPage = await movimientosAlmacenComponentsPage.goToPage(navBarPage);
  });

  it('should load MovimientosAlmacens', async () => {
    expect(await movimientosAlmacenComponentsPage.title.getText()).to.match(/Movimientos Almacens/);
    expect(await movimientosAlmacenComponentsPage.createButton.isEnabled()).to.be.true;
  });

  /* it('should create and delete MovimientosAlmacens', async () => {
        const beforeRecordsCount = await isVisible(movimientosAlmacenComponentsPage.noRecords) ? 0 : await getRecordsCount(movimientosAlmacenComponentsPage.table);
        movimientosAlmacenUpdatePage = await movimientosAlmacenComponentsPage.goToCreateMovimientosAlmacen();
        await movimientosAlmacenUpdatePage.enterData();

        expect(await movimientosAlmacenComponentsPage.createButton.isEnabled()).to.be.true;
        await waitUntilDisplayed(movimientosAlmacenComponentsPage.table);
        await waitUntilCount(movimientosAlmacenComponentsPage.records, beforeRecordsCount + 1);
        expect(await movimientosAlmacenComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

        await movimientosAlmacenComponentsPage.deleteMovimientosAlmacen();
        if(beforeRecordsCount !== 0) {
          await waitUntilCount(movimientosAlmacenComponentsPage.records, beforeRecordsCount);
          expect(await movimientosAlmacenComponentsPage.records.count()).to.eq(beforeRecordsCount);
        } else {
          await waitUntilDisplayed(movimientosAlmacenComponentsPage.noRecords);
        }
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
