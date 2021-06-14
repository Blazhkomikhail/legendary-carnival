export default class Component {
  readonly element: HTMLElement;

  constructor(
    parentNode: HTMLElement | null = null,
    tag: keyof HTMLElementTagNameMap = 'div',
    styles: string[] = [],
    innerData = ''
  ) {
    this.element = document.createElement(tag);
    if (styles.length) {
      this.element.classList.add(...styles);
    }
    this.element.innerHTML = innerData;
    if (parentNode) {
      parentNode.appendChild(this.element);
    }
  }

  destroy(): void {
    this.element.remove();
  }
}
