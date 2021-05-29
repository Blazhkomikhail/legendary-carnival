import { appContainer } from '../../index';
import { Game } from '../../components/game/game';
import { About } from '../../components/about/about';
import { GameSettings } from '../../components/game-setings/game-settings';
import { BestScore } from '../../components/best-score/best-score';

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
      const bestScorePage = new BestScore();
      appContainer.appendChild(bestScorePage.element);
    }
  },
  {
    name: 'game-settings',
    component: () => {
      const settingsPage = new GameSettings();
      appContainer.appendChild(settingsPage.element);
    }
  },
]