import { Header } from './components/header/header';
import { Router } from './services/router/router';
import { routing } from './services/router/routing';
const router = new Router(routing);

export class App {
  private readonly header: Header;

  constructor(private readonly rootElement: HTMLElement) {
    this.clearRootElement();
    this.header = new Header();
    this.rootElement.appendChild(this.header.element);
    router.route();
  }

  clearRootElement() {
    this.rootElement.innerHTML = '';
  }
}
