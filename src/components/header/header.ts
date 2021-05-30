import BaseComponent from '../shared/base-component';
import Logo from './logo/logo';
import Menu from './menu/menu';
import Button from '../shared/button/button';
import render from '../shared/render';
import Modal from '../shared/modal/modal';
import { appContainer } from '../../index';
import Form from '../registration/form/form';
import { timer } from '../game/game';

import './header.scss';

interface IButtonText {
  [key: string]: string;
}
interface IButtonHandler {
  [key: string]: EventHandlerNonNull;
}
export default class Header extends BaseComponent {
  private logo: Logo;

  private menu: Menu;

  private button: Button;

  private readonly buttonsText: IButtonText;

  private readonly buttonsHandlers: IButtonHandler;

  constructor(private currentHash: string) {
    super('header', ['header']);
    this.buttonsText = {
      game: 'Stop game',
      'about-game': 'Register new player',
      'best-score': 'Start game',
      'game-settings': 'Start game',
    };
    this.buttonsHandlers = {
      game: Header.stopGame,
      'about-game': Header.openModalWindow,
      'best-score': Header.startGame,
      'game-settings': Header.startGame,
    };
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
      this.button.element,
    ]);
  }

  static openModalWindow(): void {
    const registration = new Modal('Register new Player', new Form());
    appContainer.appendChild(registration.element);
  }

  static startGame(): void {
    window.location.hash = 'game';
  }

  static stopGame(): void {
    window.location.hash = 'about-game';
    timer.stopTimer();
  }
}
