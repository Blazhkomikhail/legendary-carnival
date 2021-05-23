const appContainer = document.getElementById('app');
import {Game} from '../../components/game/game';

export const routing = [{
    name: 'game',
    component: () => {
     const game = new Game();
     game.start();
     appContainer.appendChild(game.element);
    }
  },
  {
    name: 'about-game',
    component: () => {
      appContainer.innerHTML += `about-game`;
    }
  },
  {
    name: 'best-score',
    component: () => {
      appContainer.innerHTML += `best-score`;
    }
  },
  {
    name: 'game-settings',
    component: () => {
      appContainer.innerHTML += `game-settings`;
    }
  },
]