import { BaseComponent } from '../shared/base-component';
import { Card } from '../card/card';
import { CardsField } from '../cards-field/cards-field';
import { delay } from '../shared/delay';
import { ImageCategoryModel } from '../../image-category-models/image-category-models';
import { gameSettings } from '../../index';
import { render } from '../shared/render';
import { Timer } from '../timer/timer';
import './game.scss';

const FLIP_DELAY = 2000;

export class Game extends BaseComponent {
  private readonly cardsField: CardsField;
  private timerWrap: HTMLElement;
  private activeCard?: Card;
  private isAnimation = false;
  private timer = new Timer();

  constructor() {
    super('main', ['game']);
    const startTime = '00 : 00';
    this.timerWrap = document.createElement('div');
    this.timerWrap.classList.add('game__timer-wrap');
    this.timerWrap.innerHTML = startTime;
    setTimeout(() => {
      this.timer.startTimer(this.timerWrap);
    }, FLIP_DELAY);
    this.cardsField = new CardsField();
    render(this.element, [this.timerWrap, this.cardsField.element]);
  }

  newGame(images: string[]) {
    const cutedImages = images;
    if (gameSettings.level === 'low') {
      cutedImages.length = 4; 
    } else if (gameSettings.level === 'middle') {
      cutedImages.length = 6;
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
    }    
    this.activeCard = undefined;
    this.isAnimation = false;
  }
}