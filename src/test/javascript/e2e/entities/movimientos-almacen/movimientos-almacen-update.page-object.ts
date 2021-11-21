import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class MovimientosAlmacenUpdatePage {
  pageTitle: ElementFinder = element(by.id('cCheeseApp.movimientosAlmacen.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  desdeSelect: ElementFinder = element(by.css('select#movimientos-almacen-desde'));
  haciaSelect: ElementFinder = element(by.css('select#movimientos-almacen-hacia'));
  pesoInput: ElementFinder = element(by.css('input#movimientos-almacen-peso'));
  quesoSelect: ElementFinder = element(by.css('select#movimientos-almacen-queso'));
  userSelect: ElementFinder = element(by.css('select#movimientos-almacen-user'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDesdeSelect(desde) {
    await this.desdeSelect.sendKeys(desde);
  }

  async getDesdeSelect() {
    return this.desdeSelect.element(by.css('option:checked')).getText();
  }

  async desdeSelectLastOption() {
    await this.desdeSelect.all(by.tagName('option')).last().click();
  }
  async setHaciaSelect(hacia) {
    await this.haciaSelect.sendKeys(hacia);
  }

  async getHaciaSelect() {
    return this.haciaSelect.element(by.css('option:checked')).getText();
  }

  async haciaSelectLastOption() {
    await this.haciaSelect.all(by.tagName('option')).last().click();
  }
  async setPesoInput(peso) {
    await this.pesoInput.sendKeys(peso);
  }

  async getPesoInput() {
    return this.pesoInput.getAttribute('value');
  }

  async quesoSelectLastOption() {
    await this.quesoSelect.all(by.tagName('option')).last().click();
  }

  async quesoSelectOption(option) {
    await this.quesoSelect.sendKeys(option);
  }

  getQuesoSelect() {
    return this.quesoSelect;
  }

  async getQuesoSelectedOption() {
    return this.quesoSelect.element(by.css('option:checked')).getText();
  }

  async userSelectLastOption() {
    await this.userSelect.all(by.tagName('option')).last().click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.desdeSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.haciaSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setPesoInput('5');
    expect(await this.getPesoInput()).to.eq('5');
    await this.quesoSelectLastOption();
    await this.userSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
