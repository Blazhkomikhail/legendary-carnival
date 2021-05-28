import { BaseComponent } from '../shared/base-component';
import { render } from '../shared/render';
import { gameSettings } from '../../index';
import './game-settings.scss';

export class GameSettings extends BaseComponent {
  static selectOption(select: HTMLSelectElement, fieldName: string) {
    const cardsName = gameSettings[fieldName];
    const list = select.options;
    [].forEach.call(list, (option: HTMLOptionElement) => {
      if (option.value === cardsName) {
        select.options.selectedIndex = option.index;
      }
    })
  }

  constructor() {
    super('main', ['settings']);
    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('settings__container');

    const cardsSelectWrap = document.createElement('div');
    cardsSelectWrap.classList.add('settings__cards-container');
    const cardsLabel = document.createElement('label');
    cardsLabel.classList.add('settings__cards-label');
    cardsLabel.innerHTML = 'Game cards';
    const cardsSelect = document.createElement('select');
    cardsSelect.classList.add('settings__select');
    cardsSelect.innerHTML = `
      <option value='animals'>Animals</option>
      <option value='dogs'>Dogs</option>
    `

    GameSettings.selectOption(cardsSelect, 'cards');
    
    cardsSelect.addEventListener('change', () => {
      gameSettings.cards = cardsSelect.value;
    })

    const levelSelectWrap = document.createElement('div');
    levelSelectWrap.classList.add('settings__level-container');
    const levelLabel = document.createElement('label');
    levelLabel.classList.add('settings__cards-label');
    levelLabel.innerHTML = 'Difficulty';
    const levelSelect = document.createElement('select');
    levelSelect.classList.add('settings__select');
    levelSelect.innerHTML = `
      <option value='low'>Low</option>
      <option value='middle'>Middle</option>
      <option value='high'>High</option>
    `
    GameSettings.selectOption(levelSelect, 'level');

    levelSelect.addEventListener('change', () => {
      gameSettings.level = levelSelect.value;
    })

    render(cardsSelectWrap, [
      cardsLabel,
      cardsSelect
    ])

    render(levelSelectWrap, [
      levelLabel,
      levelSelect
    ])

    render(contentWrapper, [
      cardsSelectWrap,
      levelSelectWrap
    ])

    render(this.element, [
      contentWrapper
    ])
  }

}