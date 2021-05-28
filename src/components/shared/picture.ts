import { BaseComponent } from './base-component';

export class Picture extends BaseComponent {

  constructor(private alt: string = 'Image', private styles: string[] = [], path: string = '') {
    super('img', [...styles])
    this.element.setAttribute('alt', alt);
    this.element.classList.add(...styles);
    this.element.setAttribute('src', path);
  }
}