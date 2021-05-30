import './styles.scss';
import App from './app';
import IndexedDB from './services/db/db';

export let appContainer: HTMLElement;
export let DB = new IndexedDB();

window.onload = () => {
  appContainer = document.getElementById('app');
  window.addEventListener('popstate', () => new App(appContainer));
  const app = new App(appContainer);
}