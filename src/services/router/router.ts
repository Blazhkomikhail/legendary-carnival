import { routing } from './routing';

interface IComponent {
  name: string;
  component: CallableFunction;
}

export default class Router {
  currentHash: string;

  currentRoute: IComponent;

  defaultRoute: IComponent;

  private readonly defaultPage = 'game';

  private readonly routing: IComponent[];

  constructor() {
    this.routing = routing;
  }

  route(): void {
    this.currentHash = window.location.hash.slice(1);
    this.currentRoute = this.routing.find(
      (rout) => rout.name === this.currentHash
    );
    this.defaultRoute = this.routing.find(
      (rout) => rout.name === this.defaultPage
    );

    if (this.currentRoute) {
      this.currentRoute.component();
    } else {
      this.defaultRoute.component();
    }
  }
}
