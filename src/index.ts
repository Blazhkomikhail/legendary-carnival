import './styles.scss';
import IndexedDB from './services/db/db';
import Header from './components/header/header';
import Router from './services/router/router';
import Modal from './components/shared/modal/modal';
import Timer from './components/timer/timer';
import { MESSAGE_TIME } from './services/settings/settings';

export const appContainer = document.getElementById('app');

export default class App {
  private readonly header: Header;

  private readonly router = new Router();

  private readonly timer = new Timer();

  private readonly DB = new IndexedDB(
    App.showDBSuccessMessage,
    App.showDBErrorMessage
  );

  constructor(public rootElement: HTMLElement) {
    this.header = new Header(
      App.startGame,
      this.stopGame.bind(this),
      App.openRegisterWindow.bind(this)
    );

    this.clearRootElement();
    this.rootElement.appendChild(this.header.element);
    this.router.route(this.rootElement);
  }

  clearRootElement(): void {
    this.rootElement.innerHTML = '';
  }

  static openRegisterWindow(): void {
    const registration = new Modal('Register new Player');
    appContainer.appendChild(registration.element);
  }

  static showDBErrorMessage(): void {
    const message = new Modal(
      'Warning!',
      'Something went wrong. Try again later!'
    );
    appContainer.appendChild(message.element);
    setTimeout(() => {
      message.element.remove();
    }, MESSAGE_TIME);
  }

  static showDBSuccessMessage(): void {
    const message = new Modal('Successful!', 'New player created!');
    appContainer.appendChild(message.element);
    setTimeout(() => {
      message.element.remove();
    }, MESSAGE_TIME);
  }

  static startGame(): void {
    window.location.hash = 'game';
  }

  stopGame(): void {
    window.location.hash = 'about-game';
    this.timer.stopTimer();
  }
}

window.onload = () => {
  window.addEventListener('popstate', () => new App(appContainer));
  new App(appContainer);
};
