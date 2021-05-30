import BaseComponent from '../../base-component';
import './tooltip.scss';
export class Tooltip extends BaseComponent {

  constructor(inpName: string) {
    super('div', ['input__tooltip']);

    if (inpName === 'email') {
      this.element.innerHTML = `Поле email не может быть пустым.`
    } else {
      this.element.innerHTML = `Это поле не может содержать менее 2-х символов. 
    Также не может начинаться с цифр 
    и содержать служебные символы`;
    }
  }
}