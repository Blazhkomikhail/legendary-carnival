import './styles.scss';
import App from './app';
import IndexedDB from './services/db/db';

export const appContainer = document.getElementById('app');
export const DB = new IndexedDB();

window.onload = () => {
  window.addEventListener('popstate', () => new App(appContainer));
  new App(appContainer);
};
