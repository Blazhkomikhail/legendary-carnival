import BaseComponent from '../../shared/base-component';
import render from '../../shared/render';
import './menu.scss';
export default class Menu extends BaseComponent {
  private menuBtnWrap: HTMLElement;
  private buttons: HTMLElement[];

  constructor() {
    super('nav', ['menu', 'header__menu'])
    this.element.appendChild(this.createMenu());
  }
  
  private createMenu() {
    this.menuBtnWrap = document.createElement('ul');
    this.menuBtnWrap.classList.add('menu__items-wrapper');
    const aboutGameBtn = this.createButton('About Game');
    const bestScoreBtn = this.createButton('Best Score');
    const gameSettingsBtn = this.createButton('Game Settings');
    this.buttons = [aboutGameBtn, bestScoreBtn, gameSettingsBtn];

    render(this.menuBtnWrap, [...this.buttons]);
    return this.menuBtnWrap;
  }

  private createButton(name: string) {
    const item = document.createElement('li');
    item.classList.add('menu__item');
    item.dataset.name = `${name.split(' ').join('-').toLowerCase()}`;
    
    const hash = window.location.hash.slice(1);
    if (item.dataset.name === hash) {
      item.classList.add('menu__item_active');
    }

    const link = document.createElement('a');
    link.classList.add('menu__item-link');
    link.href = `#${name.split(' ').join('-').toLowerCase()}`;

    const className = `${name.split(' ').join('-').toLowerCase()}`;
    link.innerHTML = `
        <span class="item__icon item__icon_${className}"></span>
        <span class="item__text">${name}</span>
    `
    item.innerHTML = link.outerHTML;
    return item;
  }
}