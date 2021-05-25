import { Header } from './components/header/header';
import { Router } from './services/router/router';
import { routing } from './services/router/routing';
const router = new Router(routing);

interface IButtonText {
  [key: string]: string;
}

export class App {
  private readonly header: Header;
  private readonly hash: string;
  private readonly buttonsText: IButtonText;

  constructor(private readonly rootElement: HTMLElement) {
    this.buttonsText = {
      'game' : 'Stop game',
      'about-game' : 'Register new player',
      'best-score' : 'Start game',
      'game-settings' : 'Start game'
    }

    this.clearRootElement();
    this.hash = window.location.hash.slice(1);
    if (this.buttonsText[this.hash]) {
      this.header = new Header(this.buttonsText[this.hash]);
    } else {
      this.header = new Header(this.buttonsText.game);
    }
    
    this.rootElement.appendChild(this.header.element);
    router.route();
  }

  clearRootElement() {
    this.rootElement.innerHTML = '';
  }
}
