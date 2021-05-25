import { appContainer } from '../../index';
import { Game } from '../../components/game/game';
import { App } from '../../app';

export const routing = [{
    name: 'game',
    component: () => {
     new App(appContainer);
     const game = new Game();
     game.start();
     appContainer.appendChild(game.element);
    }
  },
  {
    name: 'about-game',
    component: () => {
      new App(appContainer);
      appContainer.innerHTML += `about-game`;
    }
  },
  {
    name: 'best-score',
    component: () => {
      new App(appContainer);
      appContainer.innerHTML += `best-score`;
    }
  },
  {
    name: 'game-settings',
    component: () => {
      new App(appContainer);
      appContainer.innerHTML += `game-settings`;
    }
  },
]