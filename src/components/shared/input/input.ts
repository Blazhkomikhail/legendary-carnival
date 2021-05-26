// import { Tooltip } from './tooltip';
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

    if (this.regexp) {
      this.element.addEventListener('input', () => {   
        if (this.regexp.test(this.element.value)) {
          this.element.style.border = '2px solid green';
        } else {
          this.element.style.border = '2px solid red';
        }
      })
    }
  }
}