import BaseComponent from '../../base-component';
import './tooltip.scss';

export default class Tooltip extends BaseComponent {
  constructor(inpName: string) {
    super('div', ['input__tooltip']);

    if (inpName === 'email') {
      this.element.innerHTML = `Это не похоже на настоящий email.`;
    } else {
      this.element.innerHTML = `Это поле не может содержать менее 2-х символов. 
    Также не может начинаться с цифр 
    и содержать служебные символы`;
    }
  }
}
