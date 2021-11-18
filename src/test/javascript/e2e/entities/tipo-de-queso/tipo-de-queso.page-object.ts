import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import TipoDeQuesoUpdatePage from './tipo-de-queso-update.page-object';

const expect = chai.expect;
export class TipoDeQuesoDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('cCheeseApp.tipoDeQueso.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-tipoDeQueso'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class TipoDeQuesoComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('tipo-de-queso-heading'));
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
    await navBarPage.getEntityPage('tipo-de-queso');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateTipoDeQueso() {
    await this.createButton.click();
    return new TipoDeQuesoUpdatePage();
  }

  async deleteTipoDeQueso() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const tipoDeQuesoDeleteDialog = new TipoDeQuesoDeleteDialog();
    await waitUntilDisplayed(tipoDeQuesoDeleteDialog.deleteModal);
    expect(await tipoDeQuesoDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/cCheeseApp.tipoDeQueso.delete.question/);
    await tipoDeQuesoDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(tipoDeQuesoDeleteDialog.deleteModal);

    expect(await isVisible(tipoDeQuesoDeleteDialog.deleteModal)).to.be.false;
  }
}
