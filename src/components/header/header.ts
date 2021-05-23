import { BaseComponent } from '../shared/base-component';
import { Logo } from './logo/logo';
import { Menu } from './menu/menu';
import { Button } from '../shared/button/button';
import { render } from '../shared/render';
import { Modal } from '../registration/modal/modal';
import { appContainer } from '../../index';
import './header.scss';
export class Header extends BaseComponent {
  private logo: Logo;
  private menu: Menu;
  private button: Button;

  constructor () {
    super('header', ['header']);
    this.logo = new Logo();
    this.menu = new Menu();
    this.button = new Button('Register new player', ['header__button']);

    this.button.element.addEventListener('click', this.openModalWindow);

    render(this.element, [
      this.logo.element,
      this.menu.element,
      this.button.element
    ])
  }

  openModalWindow() {    
    const registration = new Modal();
    appContainer.appendChild(registration.element);
  }
 
}
