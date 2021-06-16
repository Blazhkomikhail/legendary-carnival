import BaseComponent from './base-component';

export default class Picture extends BaseComponent {
  constructor(
    private alt: string = 'Image',
    private styles: string[] = [],
    path = ''
  ) {
    super('img', [...styles]);
    this.element.setAttribute('alt', alt);
    this.element.setAttribute('src', path);
  }
}
