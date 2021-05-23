import './modal.scss';
import { BaseComponent } from '../../shared/base-component';
import { Form } from './form/form';
import { render } from '../../shared/render';
// export let isModalOpen = false;

export class Modal extends BaseComponent {
  private modalWindow: HTMLElement; 

  constructor() {
    super('div', ['registration__cover']);
    this.modalWindow = this.createModal();
    this.element.appendChild(this.modalWindow);
  }

  createModal() {
    const modalBox = document.createElement('div');
    modalBox.classList.add('modal');

    const modalHeading = document.createElement('h3');
    modalHeading.classList.add('modal__heading');
    modalHeading.innerHTML = 'Register new Player';
    
    const registrationForm = new Form();

    render(modalBox, [modalHeading, registrationForm.element]);
    
    return modalBox;
  }
}