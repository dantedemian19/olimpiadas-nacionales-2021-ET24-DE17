import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import TandaQuesosUpdatePage from './tanda-quesos-update.page-object';

const expect = chai.expect;
export class TandaQuesosDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('cCheeseApp.tandaQuesos.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-tandaQuesos'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class TandaQuesosComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('tanda-quesos-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('tanda-quesos');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateTandaQuesos() {
    await this.createButton.click();
    return new TandaQuesosUpdatePage();
  }

  async deleteTandaQuesos() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const tandaQuesosDeleteDialog = new TandaQuesosDeleteDialog();
    await waitUntilDisplayed(tandaQuesosDeleteDialog.deleteModal);
    expect(await tandaQuesosDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/cCheeseApp.tandaQuesos.delete.question/);
    await tandaQuesosDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(tandaQuesosDeleteDialog.deleteModal);

    expect(await isVisible(tandaQuesosDeleteDialog.deleteModal)).to.be.false;
  }
}
