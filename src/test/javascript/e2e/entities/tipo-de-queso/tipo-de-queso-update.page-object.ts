import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class TipoDeQuesoUpdatePage {
  pageTitle: ElementFinder = element(by.id('cCheeseApp.tipoDeQueso.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nombreInput: ElementFinder = element(by.css('input#tipo-de-queso-nombre'));
  tiempoDeCuradoInput: ElementFinder = element(by.css('input#tipo-de-queso-tiempoDeCurado'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNombreInput(nombre) {
    await this.nombreInput.sendKeys(nombre);
  }

  async getNombreInput() {
    return this.nombreInput.getAttribute('value');
  }

  async setTiempoDeCuradoInput(tiempoDeCurado) {
    await this.tiempoDeCuradoInput.sendKeys(tiempoDeCurado);
  }

  async getTiempoDeCuradoInput() {
    return this.tiempoDeCuradoInput.getAttribute('value');
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
    await this.setNombreInput('nombre');
    expect(await this.getNombreInput()).to.match(/nombre/);
    await waitUntilDisplayed(this.saveButton);
    await this.setTiempoDeCuradoInput('PT12S');
    expect(await this.getTiempoDeCuradoInput()).to.contain('PT12S');
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
