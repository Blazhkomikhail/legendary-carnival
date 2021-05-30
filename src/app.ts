import Header from './components/header/header';
import Router from './services/router/router';
import { routing } from './services/router/routing';

const router = new Router(routing);
export default class App {
  private readonly header: Header;

  private readonly hash: string;

  constructor(private readonly rootElement: HTMLElement) {
    this.clearRootElement();
    this.hash = window.location.hash.slice(1);
    this.header = new Header(this.hash);

    this.rootElement.appendChild(this.header.element);
    router.route();
  }

  clearRootElement(): void {
    this.rootElement.innerHTML = '';
  }
}
