import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class CisternasUpdatePage {
  pageTitle: ElementFinder = element(by.id('cCheeseApp.cisternas.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  capacidadInput: ElementFinder = element(by.css('input#cisternas-capacidad'));
  estadoSelect: ElementFinder = element(by.css('select#cisternas-estado'));
  reservaInput: ElementFinder = element(by.css('input#cisternas-reserva'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCapacidadInput(capacidad) {
    await this.capacidadInput.sendKeys(capacidad);
  }

  async getCapacidadInput() {
    return this.capacidadInput.getAttribute('value');
  }

  async setEstadoSelect(estado) {
    await this.estadoSelect.sendKeys(estado);
  }

  async getEstadoSelect() {
    return this.estadoSelect.element(by.css('option:checked')).getText();
  }

  async estadoSelectLastOption() {
    await this.estadoSelect.all(by.tagName('option')).last().click();
  }
  async setReservaInput(reserva) {
    await this.reservaInput.sendKeys(reserva);
  }

  async getReservaInput() {
    return this.reservaInput.getAttribute('value');
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
    await this.setCapacidadInput('5');
    expect(await this.getCapacidadInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.estadoSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setReservaInput('5');
    expect(await this.getReservaInput()).to.eq('5');
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
