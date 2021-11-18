import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class TandaQuesosUpdatePage {
  pageTitle: ElementFinder = element(by.id('cCheeseApp.tandaQuesos.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  estadoSelect: ElementFinder = element(by.css('select#tanda-quesos-estado'));
  pesoInput: ElementFinder = element(by.css('input#tanda-quesos-peso'));
  pesoInicialInput: ElementFinder = element(by.css('input#tanda-quesos-pesoInicial'));
  fechaEntradaCuracionInput: ElementFinder = element(by.css('input#tanda-quesos-fechaEntradaCuracion'));
  fechaSalidaCuracionInput: ElementFinder = element(by.css('input#tanda-quesos-fechaSalidaCuracion'));
  lecheSelect: ElementFinder = element(by.css('select#tanda-quesos-leche'));
  tipoSelect: ElementFinder = element(by.css('select#tanda-quesos-tipo'));

  getPageTitle() {
    return this.pageTitle;
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
  async setPesoInput(peso) {
    await this.pesoInput.sendKeys(peso);
  }

  async getPesoInput() {
    return this.pesoInput.getAttribute('value');
  }

  async setPesoInicialInput(pesoInicial) {
    await this.pesoInicialInput.sendKeys(pesoInicial);
  }

  async getPesoInicialInput() {
    return this.pesoInicialInput.getAttribute('value');
  }

  async setFechaEntradaCuracionInput(fechaEntradaCuracion) {
    await this.fechaEntradaCuracionInput.sendKeys(fechaEntradaCuracion);
  }

  async getFechaEntradaCuracionInput() {
    return this.fechaEntradaCuracionInput.getAttribute('value');
  }

  async setFechaSalidaCuracionInput(fechaSalidaCuracion) {
    await this.fechaSalidaCuracionInput.sendKeys(fechaSalidaCuracion);
  }

  async getFechaSalidaCuracionInput() {
    return this.fechaSalidaCuracionInput.getAttribute('value');
  }

  async lecheSelectLastOption() {
    await this.lecheSelect.all(by.tagName('option')).last().click();
  }

  async lecheSelectOption(option) {
    await this.lecheSelect.sendKeys(option);
  }

  getLecheSelect() {
    return this.lecheSelect;
  }

  async getLecheSelectedOption() {
    return this.lecheSelect.element(by.css('option:checked')).getText();
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
    await this.estadoSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setPesoInput('5');
    expect(await this.getPesoInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setPesoInicialInput('5');
    expect(await this.getPesoInicialInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setFechaEntradaCuracionInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getFechaEntradaCuracionInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(this.saveButton);
    await this.setFechaSalidaCuracionInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getFechaSalidaCuracionInput()).to.contain('2001-01-01T02:30');
    await this.lecheSelectLastOption();
    await this.tipoSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
