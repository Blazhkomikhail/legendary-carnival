export default class BaseComponent {
  readonly element: HTMLElement;

  constructor(
    tag: keyof HTMLElementTagNameMap = 'div',
    styles: string[] = [],
    innerData = ''
  ) {
    this.element = document.createElement(tag);
    this.element.classList.add(...styles);
    this.element.innerHTML = innerData;
  }
}
