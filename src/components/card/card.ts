import './card.scss';
import BaseComponent from '../shared/base-component';

const FLIP_CLASS = 'flipped';

export default class Card extends BaseComponent {
  isFlipped = false;

  constructor(readonly image: string) {
    super('div', ['card__wrap']);
    
    this.element.innerHTML = `
      <div class="card">
        <div class="card__front" style="background-image: url('./images/${image}')"></div>
        <div class="card__back"></div>
      </div>
    `
  }

  flipeToBack() {
    this.isFlipped = true;
    return this.flip(true);
  }

  flipeToFront() {
    this.isFlipped = false;
    return this.flip();
  }

  private flip(isFront = false): Promise<void> {
    return new Promise ((resolve) => {
      this.element.classList.toggle(FLIP_CLASS, isFront);
      this.element.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    })
  }

}