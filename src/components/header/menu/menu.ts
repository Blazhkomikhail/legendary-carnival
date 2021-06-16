import BaseComponent from '../../shared/base-component';
import render from '../../shared/render';
import './menu.scss';

export default class Menu extends BaseComponent {
  private menuBtnWrap: BaseComponent;

  private buttons: HTMLElement[];

  constructor() {
    super('nav', ['menu']);
    this.element.appendChild(this.createMenu());
  }

  private createMenu() {
    this.menuBtnWrap = new BaseComponent('ul', ['menu__items-wrapper']);

    this.buttons = ['About Game', 'Best Score', 'Game Settings']
      .map(btnText => Menu.createButton(btnText).element);

    render(this.menuBtnWrap.element, [...this.buttons]);
    return this.menuBtnWrap.element;
  }

  static createButton(name: string): BaseComponent {
    const commonName = name.replace(/ /g, '-').toLowerCase();

    const item = new BaseComponent('li', ['menu__item']);
    item.element.dataset.name = commonName;

    const hash = window.location.hash.slice(1);
    if (commonName === hash) {
      item.element.classList.add('menu__item_active');
    }

    const link = new BaseComponent('a', ['menu__item-link']);
    link.element.setAttribute('href', `#${commonName}`);

    link.element.innerHTML = `
        <span class="item__icon item__icon_${commonName}"></span>
        <span class="item__text">${name}</span>
    `;
    item.element.innerHTML = link.element.outerHTML;
    return item;
  }
}
