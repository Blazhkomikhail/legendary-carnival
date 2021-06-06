import Header from './components/header/header';
import Main from './components/main/main';
import Component from './components/base-component';
export const rootElement = document.getElementById('root');
import './style.scss';

window.onload = () => {
  const app = new App(rootElement);
  window.addEventListener('popstate', () => app.route());
  app.route();
}

interface IComponent {
  name: string;
  component: CallableFunction;
}

class App extends Component {
  header: Header;
  main: Main;
  routing: Array<IComponent>
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['app']);
    this.header = new Header(this.element);
    this.main = new Main(this.element);
    this.routing = [
      {
        name: 'garage',
        component: (rootElement: HTMLElement): void => {
          rootElement.innerHTML = 'garage';
        },
      },
      {
        name: 'winners',
        component: (rootElement: HTMLElement): void => {
          rootElement.innerHTML = 'winners';
        },
      }
    ];
  }
  route(): void {
    const currentHash = window.location.hash.slice(1);
    const defaultPage = 'garage';
    let currentRoute = this.routing.find(
      (rout) => rout.name === currentHash
    );
    const defaultRoute = this.routing.find(
      (rout) => rout.name === defaultPage
    );

    if (currentRoute) {
      currentRoute.component(this.main.element);
    } else {
      defaultRoute.component(this.main.element);
    }
  }
}