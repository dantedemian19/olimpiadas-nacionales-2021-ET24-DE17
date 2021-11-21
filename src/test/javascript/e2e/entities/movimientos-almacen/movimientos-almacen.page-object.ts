import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import MovimientosAlmacenUpdatePage from './movimientos-almacen-update.page-object';

const expect = chai.expect;
export class MovimientosAlmacenDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('cCheeseApp.movimientosAlmacen.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-movimientosAlmacen'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class MovimientosAlmacenComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('movimientos-almacen-heading'));
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
    await navBarPage.getEntityPage('movimientos-almacen');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateMovimientosAlmacen() {
    await this.createButton.click();
    return new MovimientosAlmacenUpdatePage();
  }

  async deleteMovimientosAlmacen() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const movimientosAlmacenDeleteDialog = new MovimientosAlmacenDeleteDialog();
    await waitUntilDisplayed(movimientosAlmacenDeleteDialog.deleteModal);
    expect(await movimientosAlmacenDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /cCheeseApp.movimientosAlmacen.delete.question/
    );
    await movimientosAlmacenDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(movimientosAlmacenDeleteDialog.deleteModal);

    expect(await isVisible(movimientosAlmacenDeleteDialog.deleteModal)).to.be.false;
  }
}
