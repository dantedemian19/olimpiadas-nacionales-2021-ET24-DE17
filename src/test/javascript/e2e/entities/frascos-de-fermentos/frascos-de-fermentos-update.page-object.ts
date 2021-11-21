import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class FrascosDeFermentosUpdatePage {
  pageTitle: ElementFinder = element(by.id('cCheeseApp.frascosDeFermentos.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  calidadInput: ElementFinder = element(by.css('input#frascos-de-fermentos-calidad'));
  fechaAnalisisInput: ElementFinder = element(by.css('input#frascos-de-fermentos-fechaAnalisis'));
  estadoSelect: ElementFinder = element(by.css('select#frascos-de-fermentos-estado'));
  detallesInput: ElementFinder = element(by.css('textarea#frascos-de-fermentos-detalles'));
  pesoInput: ElementFinder = element(by.css('input#frascos-de-fermentos-peso'));
  tipoSelect: ElementFinder = element(by.css('select#frascos-de-fermentos-tipo'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCalidadInput(calidad) {
    await this.calidadInput.sendKeys(calidad);
  }

  async getCalidadInput() {
    return this.calidadInput.getAttribute('value');
  }

  async setFechaAnalisisInput(fechaAnalisis) {
    await this.fechaAnalisisInput.sendKeys(fechaAnalisis);
  }

  async getFechaAnalisisInput() {
    return this.fechaAnalisisInput.getAttribute('value');
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
  async setDetallesInput(detalles) {
    await this.detallesInput.sendKeys(detalles);
  }

  async getDetallesInput() {
    return this.detallesInput.getAttribute('value');
  }

  async setPesoInput(peso) {
    await this.pesoInput.sendKeys(peso);
  }

  async getPesoInput() {
    return this.pesoInput.getAttribute('value');
  }

  async tipoSelectLastOption() {
    await this.tipoSelect.all(by.tagName('option')).last().click();
  }

  async tipoSelectOption(option) {
    await this.tipoSelect.sendKeys(option);
  }

  getTipoSelect() {
    return this.tipoSelect;
  }

  async getTipoSelectedOption() {
    return this.tipoSelect.element(by.css('option:checked')).getText();
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
    await this.setCalidadInput('5');
    expect(await this.getCalidadInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setFechaAnalisisInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getFechaAnalisisInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.estadoSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setDetallesInput('detalles');
    expect(await this.getDetallesInput()).to.match(/detalles/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPesoInput('5');
    expect(await this.getPesoInput()).to.eq('5');
    await this.tipoSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
