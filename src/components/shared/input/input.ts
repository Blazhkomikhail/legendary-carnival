import Tooltip from './tooltip/tooltip';
import './input.scss';

export default class Input {
  readonly element: HTMLElement;

  readonly inputElement: HTMLInputElement;

  private tooltip: Tooltip;

  constructor(
    private type: string = 'text',
    private className: string[] = [],
    private dataset: string = '',
    private regexp?: RegExp
  ) {
    this.inputElement = document.createElement('input');
    this.inputElement.setAttribute('type', this.type);
    this.inputElement.classList.add(...this.className);
    this.inputElement.dataset.name = this.dataset;
    this.element = document.createElement('div');
    this.element.classList.add(
      'intput-wrapper',
      `input__${this.dataset}-wrapper`
    );
    this.element.appendChild(this.inputElement);

    this.inputElement.addEventListener('focus', () => {
      if (!this.tooltip) return;
      this.tooltip.element.remove();
    });

    if (this.regexp) {
      this.inputElement.addEventListener('input', () => {
        if (this.regexp.test(this.inputElement.value)) {
          this.success();
        } else {
          this.error();
        }
      });
    }
  }

  error(): void {
    this.inputElement.classList.remove('input_success');
    this.inputElement.classList.add('input_error');
  }

  success(): void {
    this.inputElement.classList.remove('input_error');
    this.inputElement.classList.add('input_success');
  }

  showTooltip(): void {
    const inpName = this.inputElement.dataset.name;
    this.tooltip = new Tooltip(inpName);
    this.element.appendChild(this.tooltip.element);
  }
}
