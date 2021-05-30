import BaseComponent from '../../shared/base-component';
import Input from '../../shared/input/input';
import Button from '../../shared/button/button';
import render from '../../shared/render';
import { RegExpers } from '../validation/regexps';
import { DB } from '../../../index';
import { modalCover } from '../../shared/modal/modal'
import Picture from '../../shared/picture';
import { MESSAGE_TIME } from '../../../services/settings/settings';
export let form: HTMLElement;

interface IDBData {
  [key: string]: string | number;
}
export default class Form extends BaseComponent {
  private readonly firstNameInput: Input;
  private readonly lastNameInput: Input;
  private readonly emailInput: Input;
  private readonly submitBtn: Button;
  private readonly cancelButton: Button;
  private readonly inputs: Input[];
  private userData: IDBData;

  constructor() {
    super('form', ['modal__form']);
    this.element.setAttribute('method', '#');
    form = this.element;

    const inputsWrapper = new BaseComponent('div', ['modal__inputs-wrap']);

    this.firstNameInput = new Input(
      'text', 
      ['modal__input', 'firstname-input'],
      'firstName', 
      RegExpers.firstName);
    this.firstNameInput.inputElement.setAttribute('maxlength', '30');
    this.firstNameInput.inputElement.placeholder = 'First Name';

    this.lastNameInput = new Input(
      'text', 
      ['modal__input', 'lastname-input'], 
      'lastName', RegExpers.lastName
      );
    this.lastNameInput.inputElement.setAttribute('maxlength', '30');
    this.lastNameInput.inputElement.placeholder = 'Last Name';

    this.emailInput = new Input(
      'email', 
      ['modal__input', 'email-input'], 
      'email', 
      RegExpers.email
      );
    this.emailInput.inputElement.placeholder = 'Email';

    this.inputs = [this.firstNameInput, this.lastNameInput, this.emailInput];
    this.submitBtn = new Button('Add user', ['modal__submit-btn'], () => {
      if (this.isInputsValid()) {
        this.getUserData();
        this.sendUserData();
        this.closeModalWindow();
      } else {
        this.getInvalidInput()?.showTooltip();
        this.getInvalidInput()?.addRedBorder();
      }
    });

    const mainContainer = new BaseComponent('main', ['modal__main']);
    const avatar = new Picture('Avatar', ['modal__avatar'], './images/avatar.svg');
    const btnsWrapper = new BaseComponent('div', ['modal__buttons-wrap']);

    this.cancelButton = new Button('Cancel', ['modal__cancel-btn'], this.closeModalWindow);
    this.cancelButton.element.setAttribute('type', 'Button');

    render(inputsWrapper.element, [
      this.firstNameInput.element,
      this.lastNameInput.element,
      this.emailInput.element,
    ]);

    render(mainContainer.element, [
      inputsWrapper.element,
      avatar.element
    ]);

    render(btnsWrapper.element, [
      this.submitBtn.element,
      this.cancelButton.element
    ]);

    render(this.element, [
      mainContainer.element,
      btnsWrapper.element
    ]);
  }
  
  closeModalWindow() {
    modalCover.remove();
  }

  isInputsValid() {
    return this.inputs.every((input) => {
      const name = input.inputElement.dataset.name;
      return RegExpers[name].test(input.inputElement.value);
    })
  }

  getInvalidInput() {
    let result: Input[] = [];
    this.inputs.forEach(input => {
      const name = input.inputElement.dataset.name;
      if (!RegExpers[name].test(input.inputElement.value)) {
        result.push(input);
      }
    })
    return result[0];
  }

  getUserData() {
    this.userData = {
      'email': '',
      'firstName' : '',
      'lastName' : '',
      'score' : 0
    }

    this.inputs.forEach(input => {
      this.userData[input.inputElement.dataset.name] = input.inputElement.value;
    })
    this.userData.score = localStorage.getItem('Score');
  }

  sendUserData() {
    DB.addUser(this.userData);
    DB.getUsers();
    setTimeout(() => {
      window.location.hash = 'best-score';
    }, MESSAGE_TIME);
  }
}