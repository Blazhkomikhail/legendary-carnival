import BaseComponent from '../../shared/base-component';
import Input from '../../shared/input/input';
import Button from '../../shared/button/button';
import render from '../../shared/render';
import { RegExpers } from '../validation/regexps';
import IndexedDB from '../../../services/db/db';
import { MESSAGE_TIME } from '../../../services/settings/settings';
import './form.scss';

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

  private readonly avatarInput: HTMLInputElement;

  private readonly avatarImage: HTMLImageElement;

  private readonly DB = new IndexedDB();

  constructor(private readonly cancelHandler: EventHandlerNonNull) {
    super('form', ['form']);
    this.element.setAttribute('method', '#');
    const mainContainer = new BaseComponent('main', ['form__main']);
    const inputsWrapper = new BaseComponent('div', ['form__inputs-wrap']);
    this.firstNameInput = new Input(
      'text',
      ['form__input', 'firstname-input'],
      'firstName',
      RegExpers.firstName
    );
    this.firstNameInput.inputElement.setAttribute('maxlength', '30');

    this.lastNameInput = new Input(
      'text',
      ['form__input', 'lastname-input'],
      'lastName',
      RegExpers.lastName
    );
    this.lastNameInput.inputElement.setAttribute('maxlength', '30');

    this.emailInput = new Input(
      'email',
      ['form__input', 'email-input'],
      'email',
      RegExpers.email
    );

    this.inputs = [this.firstNameInput, this.lastNameInput, this.emailInput];

    this.submitBtn = new Button('Add user', ['form__submit-btn'], () => {
      if (this.isInputsValid()) {
        this.getUserData();
        this.sendUserData();
      } else {
        this.getInvalidInputs()?.forEach((input) => {
          input.showTooltip();
          input.addRedBorder();
        });
      }
    });

    const avatarWrapper = new BaseComponent('div', ['form__avatar-wrap']);
    this.avatarImage = document.createElement('img');
    this.avatarImage.classList.add('form__avatar');
    this.avatarImage.src = './images/avatar.svg';
    this.avatarImage.setAttribute('alt', 'Avatar');

    const avatarLebel = document.createElement('label');
    avatarLebel.classList.add('form__avatar-label');
    avatarLebel.setAttribute('for', 'upload-photo');
    avatarLebel.innerHTML = 'Add your photo';

    this.avatarInput = document.createElement('input');
    this.avatarInput.type = 'file';
    this.avatarInput.classList.add('form__avatar-input');
    this.avatarInput.setAttribute('name', 'photo');
    this.avatarInput.id = 'upload-photo';

    const btnsWrapper = new BaseComponent('div', ['form__buttons-wrap']);

    this.cancelButton = new Button(
      'Cancel',
      ['form__cancel-btn'],
      this.cancelHandler
    );
    this.cancelButton.element.setAttribute('type', 'Button');

    this.avatarInput.addEventListener('change', () => this.getAvatarImage());

    avatarWrapper.element.appendChild(this.avatarImage);

    render(avatarWrapper.element, [
      this.avatarImage,
      avatarLebel,
      this.avatarInput,
    ]);

    render(inputsWrapper.element, [
      this.firstNameInput.element,
      this.lastNameInput.element,
      this.emailInput.element,
    ]);

    render(mainContainer.element, [
      inputsWrapper.element,
      avatarWrapper.element,
    ]);

    render(btnsWrapper.element, [
      this.submitBtn.element,
      this.cancelButton.element,
    ]);

    render(this.element, [mainContainer.element, btnsWrapper.element]);
  }

  isInputsValid(): boolean {
    return this.inputs.every((input) => {
      const { name } = input.inputElement.dataset;
      return RegExpers[name].test(input.inputElement.value);
    });
  }

  getInvalidInputs(): Input[] {
    const result: Input[] = [];
    this.inputs.forEach((input) => {
      const { name } = input.inputElement.dataset;
      if (!RegExpers[name].test(input.inputElement.value)) {
        result.push(input);
      }
    });
    return result;
  }

  getUserData(): void {
    this.userData = {
      email: '',
      firstName: '',
      lastName: '',
      score: 0,
      avatar: '',
    };

    this.inputs.forEach((input) => {
      this.userData[input.inputElement.dataset.name] = input.inputElement.value;
    });
    this.userData.score = localStorage.getItem('Score');
    this.userData.avatar = localStorage.getItem('AvatarImage');
  }

  getAvatarImage(): void {
    const file = this.avatarInput.files[0];
    this.convertImage(file);
  }

  convertImage(file: File): void {
    const avatarImg = this.avatarImage;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    let base64 = '';
    reader.onload = () => {
      base64 = reader.result.toString();
      Form.changeAvatar(base64, avatarImg);
      localStorage.setItem('AvatarImage', base64);
    };
  }

  static changeAvatar(file: string, avatarImg: HTMLImageElement): void {
    const avatar = avatarImg;
    avatar.src = file;
  }

  sendUserData(): void {
    this.DB.addUser(this.userData);
    this.DB.getUsers();
    setTimeout(() => {
      window.location.hash = 'best-score';
    }, MESSAGE_TIME);
  }
}
