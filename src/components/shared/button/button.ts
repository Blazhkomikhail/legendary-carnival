export class Button {
  readonly element: HTMLElement;

  constructor(text: string = 'Button', styles: string[] = [], callback: EventHandlerNonNull = null) {
    this.element = document.createElement('button');
    this.element.innerHTML = text;
    this.element.classList.add(...styles);
    this.element.addEventListener('click', callback);
  }
}