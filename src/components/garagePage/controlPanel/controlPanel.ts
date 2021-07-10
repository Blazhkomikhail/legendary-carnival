import Component from '../../baseComponent';
import store from '../../../store/store';

interface INewCar {
  name: string;
  color: string;
}

interface IUpdateControls {
  textInput: HTMLElement;
  colorInput: HTMLElement;
  button: HTMLElement;
}
export default class ControlPanel extends Component {
  onCreate: () => void;

  onUpdate: () => void;

  onDataSend: () => void;

  nameInp: Component;

  colorInp: Component;

  sendDataButton: Component;

  constructor(
    parentNode: HTMLElement | null = null,
    onRace: () => void,
    onReset: () => void,
    onGenerate: () => void
  ) {
    super(parentNode, 'div', ['control-panel']);

    const inputsWrapper = new Component(this.element, 'form', ['create-form']);

    this.nameInp = new Component(inputsWrapper.element, 'input', [
      'input-text',
    ]);
    this.nameInp.element.setAttribute('type', 'text');
    this.nameInp.element.setAttribute('maxlength', '25');

    (this.nameInp.element as HTMLInputElement).value = store.inputData.name;

    this.nameInp.element.addEventListener('input', () => {
      store.inputData.name = (this.nameInp.element as HTMLInputElement).value;
    });

    this.colorInp = new Component(inputsWrapper.element, 'input', [
      'input-color',
    ]);
    this.colorInp.element.setAttribute('type', 'color');

    const color =
      store.inputData.color === store.DEF_INP_COLOR
        ? store.DEF_INP_COLOR
        : store.inputData.color;
    this.colorInp.element.setAttribute('value', color);

    this.colorInp.element.addEventListener('input', () => {
      store.inputData.color = (this.colorInp.element as HTMLInputElement).value;
    });

    this.sendDataButton = new Component(
      inputsWrapper.element,
      'button',
      ['send-btn', 'form-btn'],
      store.garageInputType
    );
    this.sendDataButton.element.addEventListener('click', () =>
      this.onDataSend()
    );

    const buttonsWrapper = new Component(this.element, 'div', [
      'buttons-wrapper',
    ]);

    const buttonData = [
      { name: 'race', handler: onRace },
      { name: 'reset', handler: onReset },
      { name: 'generate', handler: onGenerate },
    ];
    buttonData.forEach((button) => {
      const btn = new Component(
        buttonsWrapper.element,
        'button',
        [`${button.name}-btn`, 'form-btn'],
        button.name
      );
      btn.element.addEventListener('click', button.handler);
    });
  }

  public getInpCarData(): INewCar {
    return {
      name: (this.nameInp.element as HTMLInputElement).value,
      color: (this.colorInp.element as HTMLInputElement).value,
    };
  }

  public getInputControllers(): IUpdateControls {
    return {
      textInput: this.nameInp.element,
      colorInput: this.colorInp.element,
      button: this.sendDataButton.element,
    };
  }

  public makeContolsDefault = () => {
    (this.nameInp.element as HTMLInputElement).value = '';
    (this.colorInp.element as HTMLInputElement).value =
      store.DEF_INP_COLOR;
    (this.sendDataButton.element as HTMLButtonElement).innerHTML = 
      store.DEF_BUTTON_TEXT;
    store.inputData.color = store.DEF_INP_COLOR;
    store.inputData.name = '';
  }
}
