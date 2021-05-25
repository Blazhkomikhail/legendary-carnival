import { BaseComponent } from '../shared/base-component';
import { Picture } from '../shared/picture';
import { render } from '../shared/render';
import './about.scss';

export class About extends BaseComponent {

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
    const register_num = document.createElement('span');
    register_num.classList.add('about__number');
    register_num.innerHTML = '1'
    const register_text = document.createElement('span');
    register_text.classList.add('about__text');
    register_text.innerHTML = 'Register new player in game';
    render(register, [
      register_num,
      register_text
    ]);

    const configure = document.createElement('div');
    configure.classList.add('about__configure', 'about__text-field');
    const configure_num = document.createElement('span');
    configure_num.classList.add('about__number');
    configure_num.innerHTML = '2';
    const configure_text = document.createElement('span');
    configure_text.classList.add('about__text');
    configure_text.innerHTML = 'Configure your game settings';
    render(configure, [
      configure_num,
      configure_text
    ]);

    const start = document.createElement('div');
    start.classList.add('about__start', 'about__text-field');
    const start_num = document.createElement('span');
    start_num.classList.add('about__number');
    start_num.innerHTML = '3';
    const start_text = document.createElement('span');
    start_text.classList.add('about__text');
    start_text.innerHTML = 'Start you new game! Remember card positions and match it before times up.';
    render(start, [
      start_num,
      start_text
    ]);

    const pictureWrap = document.createElement('div');
    pictureWrap.classList.add('about__pictureWrap');


    const imgRegWindow = new Picture('Register window', ['about__reg-window-img'], './images/about/register.png');
    const imgSettings = new Picture('Settings', ['about__settings-img'], './images/about/settings.png');
    const imgField = new Picture('Play field', ['about__field-img'], './images/about/field.png');

    render(insturctionWrap, [
      register,
      configure,
      start
    ])
    
    render(pictureWrap, [
      imgRegWindow.element,
      imgSettings.element,
      imgField.element
    ])

    render(contentWrap, [
      insturctionWrap,
      pictureWrap
    ])

    render(aboutContainer, [
      heading,
      contentWrap
    ])

    this.element.appendChild(aboutContainer);
  }
}