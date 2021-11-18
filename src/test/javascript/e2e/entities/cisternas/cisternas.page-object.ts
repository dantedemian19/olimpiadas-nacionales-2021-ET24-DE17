import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import CisternasUpdatePage from './cisternas-update.page-object';

const expect = chai.expect;
export class CisternasDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('cCheeseApp.cisternas.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-cisternas'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class CisternasComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('cisternas-heading'));
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
    await navBarPage.getEntityPage('cisternas');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateCisternas() {
    await this.createButton.click();
    return new CisternasUpdatePage();
  }

  async deleteCisternas() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const cisternasDeleteDialog = new CisternasDeleteDialog();
    await waitUntilDisplayed(cisternasDeleteDialog.deleteModal);
    expect(await cisternasDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/cCheeseApp.cisternas.delete.question/);
    await cisternasDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(cisternasDeleteDialog.deleteModal);

    expect(await isVisible(cisternasDeleteDialog.deleteModal)).to.be.false;
  }
}
