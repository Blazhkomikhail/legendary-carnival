import Header from './components/header/header';
import Main from './components/main/main';
import Component from './components/base-component';
import GaragePage from './components/garage-page/garage-page';

import './style.scss';

interface IComponent {
  name: string;
  component: CallableFunction;
}

class App extends Component {
  header: Header;

  main: Main;

  routing: Array<IComponent>;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['app']);
    this.header = new Header(this.element);
    this.main = new Main(this.element);
    this.routing = [
      {
        name: 'garage',
        component: (rootElement: HTMLElement): void => {
          this.clear(rootElement);
          new GaragePage(rootElement);
        },
      },
      {
        name: 'winners',
        component: (rootElement: HTMLElement): void => {
          const contentBox = rootElement;
          contentBox.innerHTML = 'winners';
        },
      },
    ];
  }

  private clear(element: HTMLElement): void {
    const container = element;
    container.innerHTML = '';
  }

  route(): void {
    const currentHash = window.location.hash.slice(1);
    const defaultPage = 'garage';
    const currentRoute = this.routing.find((rout) => rout.name === currentHash);
    const defaultRoute = this.routing.find((rout) => rout.name === defaultPage);

    if (currentRoute) {
      currentRoute.component(this.main.element);
    } else {
      defaultRoute.component(this.main.element);
    }
  }
}

window.onload = () => {
  const app = new App(document.body);
  window.addEventListener('popstate', () => app.route());
  app.route();
};
