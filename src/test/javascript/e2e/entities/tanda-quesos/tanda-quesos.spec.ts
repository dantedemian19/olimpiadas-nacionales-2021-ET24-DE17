import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TandaQuesosComponentsPage from './tanda-quesos.page-object';
import TandaQuesosUpdatePage from './tanda-quesos-update.page-object';
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

describe('TandaQuesos e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tandaQuesosComponentsPage: TandaQuesosComponentsPage;
  let tandaQuesosUpdatePage: TandaQuesosUpdatePage;
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
    tandaQuesosComponentsPage = new TandaQuesosComponentsPage();
    tandaQuesosComponentsPage = await tandaQuesosComponentsPage.goToPage(navBarPage);
  });

  it('should load TandaQuesos', async () => {
    expect(await tandaQuesosComponentsPage.title.getText()).to.match(/Tanda Quesos/);
    expect(await tandaQuesosComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete TandaQuesos', async () => {
    const beforeRecordsCount = (await isVisible(tandaQuesosComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(tandaQuesosComponentsPage.table);
    tandaQuesosUpdatePage = await tandaQuesosComponentsPage.goToCreateTandaQuesos();
    await tandaQuesosUpdatePage.enterData();

    expect(await tandaQuesosComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(tandaQuesosComponentsPage.table);
    await waitUntilCount(tandaQuesosComponentsPage.records, beforeRecordsCount + 1);
    expect(await tandaQuesosComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await tandaQuesosComponentsPage.deleteTandaQuesos();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(tandaQuesosComponentsPage.records, beforeRecordsCount);
      expect(await tandaQuesosComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(tandaQuesosComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
