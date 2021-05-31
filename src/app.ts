import Header from './components/header/header';
import Router from './services/router/router';
import Modal from './components/shared/modal/modal';
import { timer } from './components/game/game';

const router = new Router();
export default class App {
  private readonly header: Header;

  constructor(public rootElement: HTMLElement) {
    this.header = new Header(
      App.startGame,
      App.stopGame,
      this.openModalWindow.bind(this)
    );

    this.clearRootElement();
    this.rootElement.appendChild(this.header.element);
    router.route();
  }

  clearRootElement(): void {
    this.rootElement.innerHTML = '';
  }

  openModalWindow(): void {
    const registration = new Modal('Register new Player');
    this.rootElement.appendChild(registration.element);
  }

  static startGame(): void {
    window.location.hash = 'game';
  }

  static stopGame(): void {
    window.location.hash = 'about-game';
    timer.stopTimer();
  }
}
