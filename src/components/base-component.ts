export default class Component {
  readonly element: HTMLElement;

  constructor(
    parentNode: HTMLElement | null = null,
    tag: keyof HTMLElementTagNameMap = 'div',
    styles: string[] = [],
    innerData = ''
  ) {
    this.element = document.createElement(tag);
    styles.length ? this.element.classList.add(...styles) : null;
    this.element.innerHTML = innerData;
    if (parentNode) {
      parentNode.appendChild(this.element);
    }
  }

  destroy(): void {
    this.element.remove();
  }
}
