import { BaseComponent } from '../shared/base-component';
import { Card } from '../card/card';
import { CardsField } from '../cards-field/cards-field';
import { delay } from '../shared/delay';
import { ImageCategoryModel } from '../../image-category-models/image-category-models';
import { appContainer, gameSettings } from '../../index';
import { render } from '../shared/render';
import { Timer } from '../timer/timer';
import { secondsCounter } from '../timer/timer';
import { Modal } from '../shared/modal/modal';
import { Message } from '../shared/message';
import './game.scss';
import { FLIP_CARDS_DELAY } from '../../services/settings/settings';
import { START_GAME_DELAY } from '../../services/settings/settings';
import { MESSAGE_TIME } from '../../services/settings/settings';
import { Button } from '../shared/button/button';
import { Form } from '../registration/form/form';

export class Game extends BaseComponent {
  private readonly cardsField: CardsField;
  private activeCard?: Card;
  private isAnimation = false;
  private matchCount = 0;
  private levelCoef: number;
  private score = 0;
  private scoreBox: BaseComponent;
  private timer = new Timer();
  private matchesNum = 0;

  constructor() {
    super('main', ['game']);
    const startTime = '00 : 00';
    const timeScoreWrap = new BaseComponent('div', ['game__time-score']);
    const scoreWrap = new BaseComponent('div', ['game__score-wrap'], `Score: `);
    this.scoreBox = new BaseComponent('span', [], `${this.score}`);
    scoreWrap.element.appendChild(this.scoreBox.element);
    const timerWrap = new BaseComponent('div', ['game__timer-wrap'], startTime);

    setTimeout(() => {
      this.timer.startTimer(timerWrap.element);
    }, START_GAME_DELAY);

    this.cardsField = new CardsField();
    render(timeScoreWrap.element, [timerWrap.element, scoreWrap.element]);
    render(this.element, [timeScoreWrap.element, this.cardsField.element]);
  }

  newGame(images: string[]) {
    this.score = 0;
    localStorage.clear();
    
    const cutedImages = images;
    if (gameSettings.level === 'low') {
      const cardsNum = 4;
      this.matchesNum = cardsNum;
      cutedImages.length = cardsNum; 
      this.levelCoef = Number(`1.${cardsNum}`);
    } else if (gameSettings.level === 'middle') {
      const cardsNum = 6;
      this.matchesNum = cardsNum;
      cutedImages.length = cardsNum;
      this.levelCoef = Number(`1.${cardsNum}`);
    } else {
      const cardsNum = 8;
      this.matchesNum = cardsNum;
      this.levelCoef = cardsNum;
      this.levelCoef = Number(`1.${cardsNum}`);
    }

    this.cardsField.clear();
    const cards = cutedImages
      .concat(images)
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);

    cards.forEach((card) => {
      card.element.addEventListener('click', () => this.cardHandler(card));
    })
    this.cardsField.addCards(cards);
  }

  async start() {
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    const cat = categories.find(type => type.category === gameSettings.cards);
    const images = cat.images.map((name: string) => `cards/${cat.category}/${name}`);
    this.newGame(images); 
  }

  private scoreCount() {
    let scoreCalc = Math.floor(
      (this.matchCount * 100 - Math.floor(secondsCounter / 4) * 10)
      * this.levelCoef
      );
    scoreCalc < 0 ? this.score = 0 : this.score = scoreCalc;
  }

  private updatePageScore() {
    this.scoreBox.element.innerHTML = `${this.score}`;
  }

  private async cardHandler(card: Card) {
    if (this.isAnimation) return;
    if (!card.isFlipped) return;
    this.isAnimation = true;
    await card.flipeToFront();

    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }
    if (this.activeCard.image !== card.image) {
      this.activeCard.element.classList.add('card__front_red');
      card.element.classList.add('card__front_red');

      await delay(FLIP_CARDS_DELAY);
      await Promise.all([
        this.activeCard.flipeToBack(),
        card.flipeToBack(),
        this.activeCard.element.classList.remove('card__front_red'),
        card.element.classList.remove('card__front_red')
      ]);
    } else {
      this.activeCard.element.classList.add('card__front_green');
      card.element.classList.add('card__front_green');
      this.matchCount += 1;
      this.scoreCount();
      this.updatePageScore();
      localStorage.setItem('Score', `${this.score}`);
    }
    this.activeCard = undefined;
    this.isAnimation = false;
    console.log(this.matchesNum, this.matchCount);
    if (this.matchesNum === this.matchCount) {
      const message = new Modal('Congratulations!',
      new Message(`You win! Your Score: ${this.score}`));

      const buttonWrap = new BaseComponent('div', ['game__modal-btn-wrap']);
      
      const regButton = new Button('Registration', ['game__modal_reg-btn'], () => {
        this.redirectToReg(message.element);
      });
      const newGameBtn = new Button('Play again!', ['game__modal_new-game-btn'], this.startNewGame);
      render(buttonWrap.element, [regButton.element, newGameBtn.element]);
      render(message.element, [buttonWrap.element]);
      appContainer.appendChild(message.element);
    }
  }

  private redirectToReg(message: HTMLElement) {
    message.remove();
    const registration = new Modal('Register new Player', new Form());
    appContainer.appendChild(registration.element);
  }

  private startNewGame() {
    window.location.hash = '';
  }
}