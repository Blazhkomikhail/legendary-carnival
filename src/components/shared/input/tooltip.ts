import { BaseComponent } from '../base-component';
import './tooltip.scss';

export class Tooltip extends BaseComponent {

  constructor() {
    super('div', ['input__tooltip']);

    this.element.innerHTML = `Имя не может быть пустым. 
    Имя не может начинаться с цифр.
    Имя не может содержать служебные символы`;
  }
}