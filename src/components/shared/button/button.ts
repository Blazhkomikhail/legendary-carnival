import { BaseComponent } from "../base-component";
import './button.scss';

export class Button extends BaseComponent {
  private readonly buttonText: string;

  constructor(text: string) {
    super('button', ['button', 'header__button']);
    this.buttonText = text;
    this.element.innerHTML = this.buttonText;
  }
}