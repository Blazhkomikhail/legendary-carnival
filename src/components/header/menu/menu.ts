import { BaseComponent } from "../../shared/base-component";
import './menu.scss';

export class Menu extends BaseComponent {

  constructor() {
    super('nav', ['menu', 'header__menu'])

    this.element.appendChild(this.createMenu())
  }

  private createMenu() {
    const btnWrap = document.createElement('ul');
    btnWrap.classList.add('menu__items-wrapper');
    btnWrap.appendChild(this.createButton('About Game'));
    btnWrap.appendChild(this.createButton('Best Score'));
    btnWrap.appendChild(this.createButton('Game Settings'));
    return btnWrap;
  }

  private createButton(name: string, url?: string) {
    const className = `${name.split(' ').join('-').toLowerCase()}`;

    const item = document.createElement('li');
    item.classList.add('menu__item');

    const link = document.createElement('a');
    link.classList.add('menu__item-link');
    link.href = `#${name.split(' ').join('-').toLowerCase()}`;

    link.innerHTML = `
        <span class="item__icon item__icon_${className}"></span>
        <span class="item__text">${name}</span>
    `
    item.innerHTML = link.outerHTML;
    return item;
  }
}