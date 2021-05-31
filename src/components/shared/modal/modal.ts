import './modal.scss';
import BaseComponent from '../base-component';
import Form from '../../registration/form/form';
import Message from '../message';
import render from '../render';

export default class Modal extends BaseComponent {
  private modalWindow: HTMLElement;

  private mainContent: HTMLElement;

  constructor(readonly heading: string = '', readonly message: string = '') {
    super('div', ['registration__cover']);
    this.modalWindow = this.createModal();
    this.element.appendChild(this.modalWindow);
  }

  createModal(): HTMLElement {
    const modalBox = document.createElement('div');
    modalBox.classList.add('modal');

    const modalHeading = document.createElement('h3');
    modalHeading.classList.add('modal__heading');
    modalHeading.innerHTML = this.heading;

    if (this.message) {
      this.mainContent = new Message(this.message).element;
    } else {
      this.mainContent = new Form(this.destroyModal.bind(this)).element;
    }

    render(modalBox, [modalHeading, this.mainContent]);

    return modalBox;
  }

  destroyModal(): void {
    this.element.remove();
  }
}
