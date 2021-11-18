import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import LechesUpdatePage from './leches-update.page-object';

const expect = chai.expect;
export class LechesDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('cCheeseApp.leches.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-leches'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class LechesComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('leches-heading'));
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
    await navBarPage.getEntityPage('leches');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateLeches() {
    await this.createButton.click();
    return new LechesUpdatePage();
  }

  async deleteLeches() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const lechesDeleteDialog = new LechesDeleteDialog();
    await waitUntilDisplayed(lechesDeleteDialog.deleteModal);
    expect(await lechesDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/cCheeseApp.leches.delete.question/);
    await lechesDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(lechesDeleteDialog.deleteModal);

    expect(await isVisible(lechesDeleteDialog.deleteModal)).to.be.false;
  }
}
