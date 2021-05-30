import './styles.scss';
import { App } from './app';
import { IndexedDB } from './services/db/db';
interface ISettings {
  [key: string]: string;
}

export let gameSettings: ISettings;
export let appContainer: HTMLElement;
export let DB = new IndexedDB();

gameSettings = {
  cards : 'dogs',
  level : 'middle'
};

window.onload = () => {
  appContainer = document.getElementById('app');
  window.addEventListener('popstate', () => new App(appContainer));
  const app = new App(appContainer);
}