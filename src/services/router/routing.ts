import { appContainer } from '../../index';
import { Game } from '../../components/game/game';
import { About } from '../../components/about/about';

export const routing = [{
    name: 'game',
    component: () => {
      window.location.hash = 'game';
      const game = new Game();
      game.start();
      appContainer.appendChild(game.element);
    }
  },
  {
    name: 'about-game',
    component: () => {
      const about = new About();
      appContainer.appendChild(about.element);
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