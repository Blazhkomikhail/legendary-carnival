import Header from './components/header/header';
import Main from './components/main/main';
import Component from './components/base-component';
import ControlPanel from './components/garage-page/control-panel/control-panel';
import Garage from './components/garage-page/garage/garage';
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
          const controlPanel = new ControlPanel(rootElement);
          const garage = new Garage(rootElement);
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

  clear(element: HTMLElement) {
    element.innerHTML = '';
  }
}

window.onload = () => {
  const app = new App(document.body);
  window.addEventListener('popstate', () => app.route());
  app.route();
};
