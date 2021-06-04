import Game from '../../components/game/game';
import About from '../../components/about/about';
import GameSettings from '../../components/game-setings/game-settings';
import BestScore from '../../components/best-score/best-score';

const routing = [
  {
    name: 'game',
    component: (rootElement: HTMLElement): void => {
      const game = new Game(rootElement);
      game.start();
      rootElement.appendChild(game.element);
    },
  },
  {
    name: 'about-game',
    component: (rootElement: HTMLElement): void => {
      const about = new About();
      rootElement.appendChild(about.element);
    },
  },
  {
    name: 'best-score',
    component: (rootElement: HTMLElement): void => {
      const bestScorePage = new BestScore();
      rootElement.appendChild(bestScorePage.element);
    },
  },
  {
    name: 'game-settings',
    component: (rootElement: HTMLElement): void => {
      const settingsPage = new GameSettings();
      rootElement.appendChild(settingsPage.element);
    },
  },
];

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
