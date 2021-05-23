export class Input {
  readonly element: HTMLElement;

  constructor(private type: string = 'text', private className: string[] = []) {
    this.element = document.createElement('input');
    this.element.setAttribute('type', type);
    this.element.classList.add(...className);
  }

  public getValue() {
    return this.element.nodeValue;
  }

}