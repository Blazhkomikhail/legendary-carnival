import { BaseComponent } from '../shared/base-component';
import { Card } from '../card/card';
import { CardsField } from '../cards-field/cards-field';
import { delay } from '../shared/delay';
import { ImageCategoryModel } from '../../image-category-models/image-category-models';

const FLIP_DELAY = 3000;

export class Game extends BaseComponent {
  private readonly cardsField: CardsField;
  private activeCard?: Card;
  private isAnimation = false;

  constructor() {
    super('main', ['main']);
    this.cardsField = new CardsField();
    this.element.appendChild(this.cardsField.element);
  }

  newGame(images: string[]) {
    this.cardsField.clear();
    const cards = images
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
    const cat = categories[0];
    const images = cat.images.map((name: string) => `${cat.category}/${name}`);
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
      await delay(FLIP_DELAY);
      await Promise.all([this.activeCard.flipeToBack(), card.flipeToBack()]);
    }

    this.activeCard = undefined;
    this.isAnimation = false;
  }
  
}