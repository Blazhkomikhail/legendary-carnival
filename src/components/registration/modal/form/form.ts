import { BaseComponent } from '../../../shared/base-component';
import { Input } from '../../../shared/input/input';
import { Button } from '../../../shared/button/button';
import { render } from '../../../shared/render';
import { RegExpers } from '../validation/regexps';
import { DB } from '../../../../index';

interface IDBData {
  [key: string]: string | number;
}
export class Form extends BaseComponent {
  private readonly firstNameInput: Input;
  private readonly lastNameInput: Input;
  private readonly emailInput: Input;
  private readonly submitBtn: Input;
  private readonly cancelButton: Button;
  private readonly inputs: HTMLInputElement[];
  private userData: IDBData;

  constructor() {
    super('form', ['modal__form']);
    this.element.setAttribute('method', '#');

    this.element.addEventListener('submit', (e) => {
      e.preventDefault();
      this.getUserData();
      this.sendUserData();
      this.closeModalWindow();
    })

    const inputsWrapper = document.createElement('div');
    inputsWrapper.classList.add('modal__inputs-wrap');

    this.firstNameInput = new Input('text', ['modal__input', 'firstname-input'], RegExpers.firstName);
    this.firstNameInput.element.setAttribute('maxlength', '30');
    this.firstNameInput.element.dataset.name = 'firstName';

    this.lastNameInput = new Input('text', ['modal__input', 'lastname-input'], RegExpers.lastName);
    this.lastNameInput.element.setAttribute('maxlength', '30');
    this.lastNameInput.element.dataset.name = 'lastName';

    this.emailInput = new Input('email', ['modal__input', 'email-input'], RegExpers.email);
    this.emailInput.element.dataset.name = 'email';
    this.inputs = [this.firstNameInput.element, this.lastNameInput.element, this.emailInput.element];
    this.submitBtn = new Input('submit', ['modal__submit-btn']);

    const mainContainer = document.createElement('main');
    mainContainer.classList.add('modal__main');

    const avatar = document.createElement('img');
    avatar.src = './images/avatar.svg';
    avatar.classList.add('modal__avatar');

    const btnsWrapper = document.createElement('div');
    btnsWrapper.classList.add('modal__buttons-wrap');
    this.submitBtn.element.setAttribute('value', 'Add user');

    this.cancelButton = new Button('Cancel', ['modal__cancel-btn'], this.closeModalWindow);
    this.cancelButton.element.setAttribute('type', 'Button');

    render(inputsWrapper, [
      this.firstNameInput.element,
      this.lastNameInput.element,
      this.emailInput.element,
    ]);

    render(mainContainer, [
      inputsWrapper,
      avatar
    ]);

    render(btnsWrapper, [
      this.submitBtn.element,
      this.cancelButton.element
    ]);

    render(this.element, [
      mainContainer,
      btnsWrapper
    ]);
  }
  
  closeModalWindow() {
    const popUp = document.querySelector('.registration__cover');
    popUp.remove();
  }

  getUserData() {
    this.userData = {
      'email': '',
      'firstName' : '',
      'lastName' : '',
      'score' : 0
    }

    this.inputs.forEach(input => {
      this.userData[input.dataset.name] = input.value;
    })
  }

  sendUserData() {
    DB.addUser(this.userData);
  }
}