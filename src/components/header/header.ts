import BaseComponent from '../shared/base-component';
import Logo from './logo/logo';
import Menu from './menu/menu';
import Button from '../shared/button/button';
import render from '../shared/render';
import './header.scss';

interface IButtonData {
  [key: string]: {
    text: string;
    handler: EventHandlerNonNull;
  };
}
export default class Header extends BaseComponent {
  private logo: Logo;

  private menu: Menu;

  private button: Button;

  private readonly buttonsData: IButtonData;

  private currentHash: string;

  constructor(
    startGamehandle: EventHandlerNonNull,
    stopGameHandle: EventHandlerNonNull,
    openModalHandle: EventHandlerNonNull
  ) {
    super('header', ['header']);
    this.currentHash = window.location.hash.slice(1) || 'game';
    this.buttonsData = {
      game: {
        text: 'Stop game',
        handler: stopGameHandle,
      },
      'about-game': {
        text: 'Register new player',
        handler: openModalHandle,
      },
      'best-score': {
        text: 'Start game',
        handler: startGamehandle,
      },
      'game-settings': {
        text: 'Start game',
        handler: startGamehandle,
      },
    };

    this.logo = new Logo();
    this.menu = new Menu();

    if (this.buttonsData[this.currentHash].text) {
      this.button = new Button(
        this.buttonsData[this.currentHash].text,
        ['header__button'],
        this.buttonsData[this.currentHash].handler
      );
    } else {
      this.button = new Button(
        this.buttonsData.game.text,
        ['header__button'],
        this.buttonsData.game.handler
      );
    }

    render(this.element, [
      this.logo.element,
      this.menu.element,
      this.button.element,
    ]);
  }
}
