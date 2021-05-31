import BaseComponent from '../shared/base-component';
import Card from '../card/card';
import CardsField from '../cards-field/cards-field';
import { delay } from '../shared/delay';
import { ImageCategoryModel } from '../../image-category-models/image-category-models';

import {
  gameSettings,
  FLIP_CARDS_DELAY,
  START_GAME_DELAY,
} from '../../services/settings/settings';
import render from '../shared/render';

import Timer from '../timer/timer';

import Modal from '../shared/modal/modal';

import Button from '../shared/button/button';

import { imageCategoties } from '../../assets/imageCategoties';

import './game.scss';

export const timer = new Timer();

export default class Game extends BaseComponent {
  private readonly cardsField: CardsField;

  private activeCard?: Card;

  private isAnimation = false;

  private matchCount = 0;

  private levelCoef: number;

  private score = 0;

  private scoreBox: BaseComponent;

  private matchesNum = 0;

  private appContainer: HTMLElement;

  private categories: ImageCategoryModel[];

  private timerWrap: HTMLElement;

  constructor(rootContainer: HTMLElement) {
    super('main', ['game']);
    this.appContainer = rootContainer;
    this.categories = imageCategoties;
    const startTime = '00 : 00';
    const timeScoreWrap = new BaseComponent('div', ['game__time-score'])
      .element;
    const scoreWrap = new BaseComponent('div', ['game__score-wrap'], `Score: `)
      .element;
    this.scoreBox = new BaseComponent('span', [], `${this.score}`);
    scoreWrap.appendChild(this.scoreBox.element);
    this.timerWrap = new BaseComponent(
      'div',
      ['game__timer-wrap'],
      startTime
    ).element;

    this.cardsField = new CardsField();
    render(timeScoreWrap, [this.timerWrap, scoreWrap]);
    render(this.element, [timeScoreWrap, this.cardsField.element]);
  }

  newGame(images: string[]): void {
    this.score = 0;
    localStorage.clear();
    timer.stopTimer();
    setTimeout(() => {
      timer.startTimer(this.timerWrap);
    }, START_GAME_DELAY);

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
    });
    this.cardsField.addCards(cards);
  }

  start(): void {
    const cat = this.categories.find(
      (type) => type.category === gameSettings.cards
    );
    const images = cat.images.map(
      (name: string) => `cards/${cat.category}/${name}`
    );
    this.newGame(images);
  }

  private scoreCount() {
    const scoreCalc = Math.floor(
      (this.matchCount * 100 - Math.floor(timer.getSeconds() / 4) * 10) *
        this.levelCoef
    );
    if (scoreCalc > 0) {
      this.score = scoreCalc;
    } else {
      this.score = 0;
    }
  }

  private updatePageScore() {
    this.scoreBox.element.innerHTML = `${this.score}`;
  }

  private async cardHandler(card: Card) {
    if (this.isAnimation || !card.isFlipped) return;
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
        card.element.classList.remove('card__front_red'),
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
    if (this.matchesNum === this.matchCount) {
      timer.stopTimer();
      const message = new Modal(
        'Congratulations!',
        `You win! Your Score: ${this.score}`
      );

      const buttonWrap = new BaseComponent('div', ['game__modal-btn-wrap']);
      const regButton = new Button(
        'Registration',
        ['game__modal_reg-btn'],
        () => {
          this.redirectToReg(message.element);
        }
      );
      const cancelBtn = new Button(
        'Cancel',
        ['game__modal_cancel-btn'],
        Game.redirectToBestScore
      );
      render(buttonWrap.element, [cancelBtn.element, regButton.element]);
      render(message.element, [buttonWrap.element]);
      this.appContainer.appendChild(message.element);
    }
  }

  private redirectToReg(message: HTMLElement): void {
    message.remove();
    const registration = new Modal('Register new Player');
    this.appContainer.appendChild(registration.element);
  }

  static redirectToBestScore(): void {
    window.location.hash = 'best-score';
  }

  destroyGame(): void {
    this.element.remove();
  }
}
