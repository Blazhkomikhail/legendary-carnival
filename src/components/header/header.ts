import { BaseComponent } from '../shared/base-component';
import { Logo } from './logo/logo';
import { Menu } from './menu/menu';
import { Button } from '../shared/button/button';
import { render } from '../shared/render';
import { Modal } from '../shared/modal/modal';
import { appContainer } from '../../index';
import './header.scss';
import { Form } from '../registration/modal/form/form';
interface IButtonText {
  [key: string]: string;
}
interface IButtonHandler {
  [key: string]: EventHandlerNonNull;
}
export class Header extends BaseComponent {
  private logo: Logo;
  private menu: Menu;
  private button: Button;
  private readonly buttonsText: IButtonText;
  private readonly buttonsHandlers: IButtonHandler;

  constructor (private currentHash: string) {
    super('header', ['header']);
    this.buttonsText = {
      'game' : 'Stop game',
      'about-game' : 'Register new player',
      'best-score' : 'Start game',
      'game-settings' : 'Start game'
    };
    this.buttonsHandlers = {
      'game' : this.stopGame,
      'about-game' : this.openModalWindow,
      'best-score' : this.startGame,
      'game-settings' : this.startGame
    }
    this.logo = new Logo();
    this.menu = new Menu();

    if (this.buttonsText[currentHash]) {
      this.button = new Button(
        this.buttonsText[currentHash], 
        ['header__button'], 
        this.buttonsHandlers[currentHash]
        );
    } else {
      this.button = new Button(
        this.buttonsText.game, 
        ['header__button'], 
        this.buttonsHandlers.game
        );
    }
            
    render(this.element, [
      this.logo.element,
      this.menu.element,
      this.button.element
    ])
  }
  
  openModalWindow() {
    const registration = new Modal('Register new Player', new Form());
    appContainer.appendChild(registration.element);
  }

  startGame() {
    window.location.hash = 'game';
  }

  stopGame() {
    console.log('stop game');
  }
}
