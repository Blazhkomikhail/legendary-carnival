import BaseComponent from '../shared/base-component';
import render from '../shared/render';
import { gameSettings } from '../../services/settings/settings';
import './game-settings.scss';

export default class GameSettings extends BaseComponent {

  constructor() {
    super('main', ['settings']);
    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('settings__container');

    const cadsSelect = GameSettings.createSelect(
      'cards', 
      'Game cards',
      ` <option value='animals'>Animals</option>
        <option value='dogs'>Dogs</option>
      `
      );

    const levelSelect = GameSettings.createSelect(
      'level', 
      'Difficulty',
      ` <option value='low'>Low</option>
        <option value='middle'>Middle</option>
        <option value='high'>High</option>
      `);

    render(contentWrapper, [cadsSelect, levelSelect]);
    render(this.element, [contentWrapper]);
  }

  static selectOption(select: HTMLSelectElement, fieldName: string): void {
    const cardsName = gameSettings[fieldName];
    const selectOptions = select.options;
    [].forEach.call(selectOptions, (option: HTMLOptionElement) => {
      if (option.value === cardsName) {
        selectOptions.selectedIndex = option.index;
      }
    });
  }

  static createSelect(className: string, selectName: string, options: string): HTMLElement {
    const selectWrap = document.createElement('div');
    selectWrap.classList.add(`settings__${className}-container`);
    const label = document.createElement('label');
    label.classList.add('settings__cards-label');
    label.innerHTML = selectName;
    const select = document.createElement('select');
    select.classList.add('settings__select');
    select.innerHTML = options;
    render(selectWrap, [label, select]);
    GameSettings.selectOption(select, className);

    select.addEventListener('change', () => {
      gameSettings[className] = select.value;
    });
    return selectWrap;
  }
}
