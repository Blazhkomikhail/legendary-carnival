import { Tooltip } from './tooltip';
import { tooltip } from './tooltip';
import { form } from '../../registration/form/form';
export class Input {
  readonly element: HTMLInputElement;

  constructor(
    private type: string = 'text', 
    private className: string[] = [],
    private regexp?: RegExp
    ) {
    this.element = document.createElement('input');
    this.element.setAttribute('type', this.type);
    this.element.classList.add(...this.className);

    this.element.addEventListener('focus', () => {
      if(!tooltip) return;
      tooltip.remove();
    })

    if (this.regexp) {
      this.element.addEventListener('input', () => {   
        if (this.regexp.test(this.element.value)) {
          this.addGreenBorder()
        } else {
          this.addRedBorder();
        }
      })
    }
  }

  addRedBorder() {
    this.element.style.border = '2px solid red';
  }

  addGreenBorder() {
    this.element.style.border = '2px solid green';
  }

  showTooltip() {
    const inpName = this.element.dataset.name;
    const tooltip = new Tooltip(inpName);
    form.appendChild(tooltip.element);
  }
}