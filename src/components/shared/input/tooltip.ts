import { BaseComponent } from '../base-component';
import './tooltip.scss';
export let tooltip: HTMLElement;
export class Tooltip extends BaseComponent {

  constructor(inpName: string) {
    super('div', ['input__tooltip']);
    tooltip = this.element;

    if (inpName === 'email') {
      this.element.innerHTML = `Поле email не может быть пустым.`
      tooltip.style.bottom = '80px';
      tooltip.style.left = '20px';
    } else {
      this.element.innerHTML = `Это поле не может содержать менее 2-х символов. 
    Также не может начинаться с цифр 
    и не может содержать служебные символы`;
      if (inpName === 'firstName') {
        tooltip.style.right = '35px';
      }
      else {
        tooltip.style.top = '70px';
        tooltip.style.right = '35px';
      }
    }
  }
}