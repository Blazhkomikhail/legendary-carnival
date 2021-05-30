export default class BaseComponent {
  readonly element: HTMLElement;

  constructor(
    tag: keyof HTMLElementTagNameMap = 'div', 
    styles: string[] = [], 
    innerData: string = ''
      ) {
    this.element = document.createElement(tag);
    this.element.classList.add(...styles);
    this.element.innerHTML = innerData;
  }
}