import { BaseComponent } from '../../../components/shared/base-component';

export class Message extends BaseComponent {

  constructor(private text: string) {
    super('span', ['message-text']);
    this.element.innerHTML = text;
  }
}