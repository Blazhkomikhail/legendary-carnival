import { BaseComponent } from '../shared/base-component';
import { Logo } from './logo/logo';
import { Menu } from './menu/menu';
import { Button } from '../shared/button/button';
import './header.scss';

export class Header extends BaseComponent {
  private logo: Logo;
  private menu: Menu;
  private button: Button;

  constructor () {
    super('header', ['header']);
    this.logo = new Logo();
    this.menu = new Menu();
    this.button = new Button('Register new player');
    this.element.appendChild(this.logo.element);
    this.element.appendChild(this.menu.element);
    this.element.appendChild(this.button.element);
  }
 
}