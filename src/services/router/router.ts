interface IComponent {
  name: string,
  component: CallableFunction;
}

export class Router {
  currentHash: string;
  currentRoute: IComponent;
  defaultRoute: IComponent;
  private readonly defaultPage = 'game';
  private readonly routing: IComponent[];

  constructor(routingArr: IComponent[]) {
    this.routing = routingArr;
  }

  route () {
    this.currentHash = window.location.hash.slice(1);
    this.currentRoute = this.routing.find((routName) => routName.name === this.currentHash);
    this.defaultRoute = this.routing.find((routName) => routName.name === this.defaultPage);

    this.currentRoute ? this.currentRoute.component() : this.defaultRoute.component();
  }
}