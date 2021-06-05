import './modal.scss';
import BaseComponent from '../base-component';
import Form, { IDBData } from '../../registration/form/form';
import Message from '../message';
import render from '../render';
import IndexedDB from '../../../services/db/db';
import { MESSAGE_TIME } from '../../../services/settings/settings';

export default class Modal extends BaseComponent {
  private mainContent: HTMLElement;

  private db = new IndexedDB();

  sendUserData(data: IDBData): void {
    this.db.addUser(data);
    this.db.getUsers();
    setTimeout(() => {
      window.location.hash = 'best-score';
    }, MESSAGE_TIME);
  }

  constructor(readonly heading: string = '', readonly message: string = '') {
    super('div', ['registration__cover']);
    const modalBox = new BaseComponent('div', ['modal']);
    const modalHeading = new BaseComponent(
      'h3',
      ['modal__heading'],
      this.heading
    );

    if (this.message) {
      this.mainContent = new Message(this.message).element;
    } else {
      const form = new Form();
      form.cancelHandler = () => {
        this.destroyModal();
      };
      form.sendUserData = () => {
        this.sendUserData(form.getUserData());
      };
      this.mainContent = form.element;
    }

    this.db.onOk = () => {
      const successMessage = new Message(
        'Successful! New player have been created!'
      );
      this.mainContent.innerHTML = '';
      this.mainContent.appendChild(successMessage.element);
      setTimeout(() => {
        successMessage.element.remove();
      }, MESSAGE_TIME);
    };

    this.db.onError = () => {
      const errorMessage = new Message(
        'Warning! Something went wrong. Try again later!'
      );
      this.mainContent.innerHTML = '';
      this.mainContent.appendChild(errorMessage.element);
      setTimeout(() => {
        errorMessage.element.remove();
      }, MESSAGE_TIME);
    };

    render(modalBox.element, [modalHeading.element, this.mainContent]);

    this.element.appendChild(modalBox.element);
  }

  destroyModal(): void {
    this.element.remove();
  }
}
