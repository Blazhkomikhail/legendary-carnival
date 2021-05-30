import BaseComponent from '../../shared/base-component';
import render from '../../shared/render';
import './menu.scss';
export default class Menu extends BaseComponent {
  private menuBtnWrap: BaseComponent;
  private buttons: HTMLElement[];

  constructor() {
    super('nav', ['menu'])
    this.element.appendChild(this.createMenu());
  }
  
  private createMenu() {
    this.menuBtnWrap = new BaseComponent('ul', ['menu__items-wrapper']);

    const aboutGameBtn = this.createButton('About Game');
    const bestScoreBtn = this.createButton('Best Score');
    const gameSettingsBtn = this.createButton('Game Settings');
    this.buttons = [
      aboutGameBtn.element, 
      bestScoreBtn.element, 
      gameSettingsBtn.element
    ];

    render(this.menuBtnWrap.element, [...this.buttons]);
    return this.menuBtnWrap.element;
  }

  private createButton(name: string) {
    const item = new BaseComponent('li', ['menu__item']);
    item.element.dataset.name = name.replace(/ /g, '-').toLowerCase();
    
    const hash = window.location.hash.slice(1);
    if (item.element.dataset.name === hash) {
      item.element.classList.add('menu__item_active');
    }

    const link = new BaseComponent('a', ['menu__item-link']);
    link.element.setAttribute('href', '#' + name.replace(/ /g, '-').toLowerCase());

    const className = `${name.replace(/ /g, '-').toLowerCase()}`;
    link.element.innerHTML = `
        <span class="item__icon item__icon_${className}"></span>
        <span class="item__text">${name}</span>
    `
    item.element.innerHTML = link.element.outerHTML;
    return item;
  }
}