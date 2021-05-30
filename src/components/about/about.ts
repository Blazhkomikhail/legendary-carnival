import BaseComponent from '../shared/base-component';
import Picture from '../shared/picture';
import render from '../shared/render';
import './about.scss';

export default class About extends BaseComponent {
  constructor() {
    super('main', ['about']);

    const aboutContainer = document.createElement('div');
    aboutContainer.classList.add('about__container');

    const heading = document.createElement('h2');
    heading.innerHTML = 'How to play?';
    heading.classList.add('about__heading');

    const contentWrap = document.createElement('div');
    contentWrap.classList.add('about__contentWrap');

    const insturctionWrap = document.createElement('div');
    insturctionWrap.classList.add('about__insturctionWrap');

    const register = document.createElement('div');
    register.classList.add('about__register', 'about__text-field');
    const registerNum = document.createElement('span');
    registerNum.classList.add('about__number');
    registerNum.innerHTML = '1';
    const registerText = document.createElement('span');
    registerText.classList.add('about__text');
    registerText.innerHTML = 'Register new player in game';
    render(register, [registerNum, registerText]);

    const configure = document.createElement('div');
    configure.classList.add('about__configure', 'about__text-field');
    const configureNum = document.createElement('span');
    configureNum.classList.add('about__number');
    configureNum.innerHTML = '2';
    const configureText = document.createElement('span');
    configureText.classList.add('about__text');
    configureText.innerHTML = 'Configure your game settings';
    render(configure, [configureNum, configureText]);

    const start = document.createElement('div');
    start.classList.add('about__start', 'about__text-field');
    const startNum = document.createElement('span');
    startNum.classList.add('about__number');
    startNum.innerHTML = '3';
    const startText = document.createElement('span');
    startText.classList.add('about__text');
    startText.innerHTML =
      'Start you new game! Remember card positions and match it before times up.';
    render(start, [startNum, startText]);

    const pictureWrap = document.createElement('div');
    pictureWrap.classList.add('about__pictureWrap');

    const imgRegWindow = new Picture(
      'Register window',
      ['about__reg-window-img'],
      './images/about/register.png'
    );
    const imgSettings = new Picture(
      'Settings',
      ['about__settings-img'],
      './images/about/settings.png'
    );
    const imgField = new Picture(
      'Play field',
      ['about__field-img'],
      './images/about/field.png'
    );

    render(insturctionWrap, [register, configure, start]);

    render(pictureWrap, [
      imgRegWindow.element,
      imgSettings.element,
      imgField.element,
    ]);

    render(contentWrap, [insturctionWrap, pictureWrap]);

    render(aboutContainer, [heading, contentWrap]);

    this.element.appendChild(aboutContainer);
  }
}
