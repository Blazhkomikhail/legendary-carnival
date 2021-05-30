import { BaseComponent } from './base-component';

export class Message extends BaseComponent {

  constructor(private text: string) {
    super('p', ['message-text']);
    this.element.innerHTML = text;
  }
}