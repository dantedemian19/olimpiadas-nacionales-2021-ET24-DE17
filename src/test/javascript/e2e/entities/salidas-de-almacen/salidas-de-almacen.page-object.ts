import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import SalidasDeAlmacenUpdatePage from './salidas-de-almacen-update.page-object';

const expect = chai.expect;
export class SalidasDeAlmacenDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('cCheeseApp.salidasDeAlmacen.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-salidasDeAlmacen'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class SalidasDeAlmacenComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('salidas-de-almacen-heading'));
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
    await navBarPage.getEntityPage('salidas-de-almacen');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateSalidasDeAlmacen() {
    await this.createButton.click();
    return new SalidasDeAlmacenUpdatePage();
  }

  async deleteSalidasDeAlmacen() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const salidasDeAlmacenDeleteDialog = new SalidasDeAlmacenDeleteDialog();
    await waitUntilDisplayed(salidasDeAlmacenDeleteDialog.deleteModal);
    expect(await salidasDeAlmacenDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/cCheeseApp.salidasDeAlmacen.delete.question/);
    await salidasDeAlmacenDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(salidasDeAlmacenDeleteDialog.deleteModal);

    expect(await isVisible(salidasDeAlmacenDeleteDialog.deleteModal)).to.be.false;
  }
}
