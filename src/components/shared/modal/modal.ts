import './modal.scss';
import { BaseComponent } from '../base-component';
import { Form } from '../../registration/form/form';
import { Message } from '../../../services/db/message/message';
import { render } from '../render';
export let modalCover: HTMLElement;

export class Modal extends BaseComponent {
  private modalWindow: HTMLElement;

  constructor(readonly heading: string = '',
    readonly innerContent: Form | Message) {
    super('div', ['registration__cover']);
    this.modalWindow = this.createModal();
    this.element.appendChild(this.modalWindow);
    modalCover = this.element;
  }

  createModal() {
    const modalBox = document.createElement('div');
    modalBox.classList.add('modal');

    const modalHeading = document.createElement('h3');
    modalHeading.classList.add('modal__heading');
    modalHeading.innerHTML = this.heading;
    
    const registrationForm = this.innerContent || null;

    render(modalBox, [modalHeading, registrationForm.element]);
    
    return modalBox;
  }
}