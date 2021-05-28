import { BaseComponent } from '../shared/base-component';
import { Card } from '../card/card';
import { CardsField } from '../cards-field/cards-field';
import { delay } from '../shared/delay';
import { ImageCategoryModel } from '../../image-category-models/image-category-models';
import { gameSettings } from '../../index';
import { render } from '../shared/render';
import { Timer } from '../timer/timer';
import { secondsCounter } from '../timer/timer';
import './game.scss';

export let score = 0;
const FLIP_DELAY = 2000;

export class Game extends BaseComponent {
  private readonly cardsField: CardsField;
  private activeCard?: Card;
  private isAnimation = false;
  private matchCount = 0;
  private levelCoef: number;
  private score: HTMLElement;
  private timer = new Timer();

  constructor() {
    super('main', ['game']);
    const startTime = '00 : 00';

    const timeScoreWrap = document.createElement('div');
    timeScoreWrap.classList.add('game__time-score');

    const scoreWrap = document.createElement('div');
    scoreWrap.classList.add('game__score-wrap');
    this.score = document.createElement('span');
    this.score.innerHTML = `${score}`;
    scoreWrap.innerHTML = `Score: `;
    scoreWrap.appendChild(this.score);
    const timerWrap = document.createElement('div');
    timerWrap.classList.add('game__timer-wrap');
    timerWrap.innerHTML = startTime;

    setTimeout(() => {
      this.timer.startTimer(timerWrap);
    }, FLIP_DELAY);
    this.cardsField = new CardsField();
    render(timeScoreWrap, [timerWrap, scoreWrap]);
    render(this.element, [timeScoreWrap, this.cardsField.element]);
  }

  newGame(images: string[]) {
    score = 0;
    const cutedImages = images;
    if (gameSettings.level === 'low') {
      const cardsNum = 4;
      cutedImages.length = cardsNum; 
      this.levelCoef = Number(`1.${cardsNum}`);
    } else if (gameSettings.level === 'middle') {
      const cardsNum = 6;
      cutedImages.length = cardsNum;
      this.levelCoef = Number(`1.${cardsNum}`);
    } else {
      const cardsNum = 8;
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
    const scoreCalc = Math.floor(
      (this.matchCount * 100 - Math.floor(secondsCounter / 5) * 10)
      * this.levelCoef
      );
    scoreCalc < 0 ? score = 0 : score = scoreCalc;
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

      await delay(FLIP_DELAY);
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
      this.score.innerHTML = `${score}`;
    }
    this.activeCard = undefined;
    this.isAnimation = false;
  }
}