// import Header from './components/header/header';
// import Router from './services/router/router';
// import Modal from './components/shared/modal/modal';
// import { timer } from './components/game/game';
// import { MESSAGE_TIME } from './services/settings/settings';

// export default class App {
//   private readonly header: Header;

//   private readonly router = new Router();

//   constructor(public rootElement: HTMLElement) {
//     this.header = new Header(
//       App.startGame,
//       App.stopGame,
//       this.openRegisterWindow.bind(this)
//     );

//     this.clearRootElement();
//     this.rootElement.appendChild(this.header.element);
//     this.router.route(this.rootElement);
//   }

//   clearRootElement(): void {
//     this.rootElement.innerHTML = '';
//   }

//   openRegisterWindow(): void {
//     const registration = new Modal('Register new Player');
//     this.rootElement.appendChild(registration.element);
//   }

//   showDBErrorMessage() {
//     const message = new Modal(
//       'Warning!',
//       'Something went wrong. Try again later!'
//     );
//     this.rootElement.appendChild(message.element);
//     setTimeout(() => {
//       message.element.remove();
//     }, MESSAGE_TIME);
//   }

//   showDBSuccessMessage() {
//     const message = new Modal('Successful!', 'New player created!');
//       this.rootElement.appendChild(message.element);
//       setTimeout(() => {
//         message.element.remove();
//       }, MESSAGE_TIME);
//   }

//   static startGame(): void {
//     window.location.hash = 'game';
//   }

//   static stopGame(): void {
//     window.location.hash = 'about-game';
//     timer.stopTimer();
//   }
// }
