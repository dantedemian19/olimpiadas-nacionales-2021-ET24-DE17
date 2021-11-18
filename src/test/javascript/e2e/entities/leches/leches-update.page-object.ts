import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class LechesUpdatePage {
  pageTitle: ElementFinder = element(by.id('cCheeseApp.leches.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  analisisInput: ElementFinder = element(by.css('textarea#leches-analisis'));
  calidadInput: ElementFinder = element(by.css('input#leches-calidad'));
  cantidadInput: ElementFinder = element(by.css('input#leches-cantidad'));
  fechaDeIngresoInput: ElementFinder = element(by.css('input#leches-fechaDeIngreso'));
  cisternaSelect: ElementFinder = element(by.css('select#leches-cisterna'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAnalisisInput(analisis) {
    await this.analisisInput.sendKeys(analisis);
  }

  async getAnalisisInput() {
    return this.analisisInput.getAttribute('value');
  }

  async setCalidadInput(calidad) {
    await this.calidadInput.sendKeys(calidad);
  }

  async getCalidadInput() {
    return this.calidadInput.getAttribute('value');
  }

  async setCantidadInput(cantidad) {
    await this.cantidadInput.sendKeys(cantidad);
  }

  async getCantidadInput() {
    return this.cantidadInput.getAttribute('value');
  }

  async setFechaDeIngresoInput(fechaDeIngreso) {
    await this.fechaDeIngresoInput.sendKeys(fechaDeIngreso);
  }

  async getFechaDeIngresoInput() {
    return this.fechaDeIngresoInput.getAttribute('value');
  }

  async cisternaSelectLastOption() {
    await this.cisternaSelect.all(by.tagName('option')).last().click();
  }

  async cisternaSelectOption(option) {
    await this.cisternaSelect.sendKeys(option);
  }

  getCisternaSelect() {
    return this.cisternaSelect;
  }

  async getCisternaSelectedOption() {
    return this.cisternaSelect.element(by.css('option:checked')).getText();
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
    await this.setAnalisisInput('analisis');
    expect(await this.getAnalisisInput()).to.match(/analisis/);
    await waitUntilDisplayed(this.saveButton);
    await this.setCalidadInput('5');
    expect(await this.getCalidadInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setCantidadInput('5');
    expect(await this.getCantidadInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setFechaDeIngresoInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getFechaDeIngresoInput()).to.contain('2001-01-01T02:30');
    await this.cisternaSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
