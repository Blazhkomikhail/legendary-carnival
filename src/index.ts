import './styles.scss';
import { App } from './app';
export let appContainer: HTMLElement;

window.onload = () => {
  appContainer = document.getElementById('app');
  window.addEventListener('popstate', () => new App(appContainer));
  new App(appContainer);
};