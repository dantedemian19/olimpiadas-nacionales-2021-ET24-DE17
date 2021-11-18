import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class SalidasDeAlmacenUpdatePage {
  pageTitle: ElementFinder = element(by.id('cCheeseApp.salidasDeAlmacen.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  pesoInput: ElementFinder = element(by.css('input#salidas-de-almacen-peso'));
  tandaDeQuesoSelect: ElementFinder = element(by.css('select#salidas-de-almacen-tandaDeQueso'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setPesoInput(peso) {
    await this.pesoInput.sendKeys(peso);
  }

  async getPesoInput() {
    return this.pesoInput.getAttribute('value');
  }

  async tandaDeQuesoSelectLastOption() {
    await this.tandaDeQuesoSelect.all(by.tagName('option')).last().click();
  }

  async tandaDeQuesoSelectOption(option) {
    await this.tandaDeQuesoSelect.sendKeys(option);
  }

  getTandaDeQuesoSelect() {
    return this.tandaDeQuesoSelect;
  }

  async getTandaDeQuesoSelectedOption() {
    return this.tandaDeQuesoSelect.element(by.css('option:checked')).getText();
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
    await this.setPesoInput('5');
    expect(await this.getPesoInput()).to.eq('5');
    await this.tandaDeQuesoSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
