const routing = [
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

interface IComponent {
  name: string;
  component: CallableFunction;
}

export default class Router {
  currentHash: string;

  currentRoute: IComponent;

  defaultRoute: IComponent;

  private readonly defaultPage = 'garage';

  private readonly routing: IComponent[];

  constructor() {
    this.routing = routing;
  }

  route(rootElement: HTMLElement): void {
    this.currentHash = window.location.hash.slice(1);
    this.currentRoute = this.routing.find(
      (rout) => rout.name === this.currentHash
    );
    this.defaultRoute = this.routing.find(
      (rout) => rout.name === this.defaultPage
    );

    if (this.currentRoute) {
      this.currentRoute.component(rootElement);
    } else {
      this.defaultRoute.component(rootElement);
    }
  }
}