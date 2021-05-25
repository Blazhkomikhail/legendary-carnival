import './styles.scss';
import { App } from './app';
import { Router } from './services/router/router';
import { routing } from './services/router/routing';
export let appContainer: HTMLElement;
const router = new Router(routing);

window.onload = () => {
  appContainer = document.getElementById('app');

  window.addEventListener('popstate', () => router.route());
  router.route();
  // new App(appContainer);
};