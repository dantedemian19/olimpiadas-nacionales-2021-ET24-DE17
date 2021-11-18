import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import FrascosDeFermentosUpdatePage from './frascos-de-fermentos-update.page-object';

const expect = chai.expect;
export class FrascosDeFermentosDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('cCheeseApp.frascosDeFermentos.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-frascosDeFermentos'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class FrascosDeFermentosComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('frascos-de-fermentos-heading'));
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
    await navBarPage.getEntityPage('frascos-de-fermentos');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateFrascosDeFermentos() {
    await this.createButton.click();
    return new FrascosDeFermentosUpdatePage();
  }

  async deleteFrascosDeFermentos() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const frascosDeFermentosDeleteDialog = new FrascosDeFermentosDeleteDialog();
    await waitUntilDisplayed(frascosDeFermentosDeleteDialog.deleteModal);
    expect(await frascosDeFermentosDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /cCheeseApp.frascosDeFermentos.delete.question/
    );
    await frascosDeFermentosDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(frascosDeFermentosDeleteDialog.deleteModal);

    expect(await isVisible(frascosDeFermentosDeleteDialog.deleteModal)).to.be.false;
  }
}
