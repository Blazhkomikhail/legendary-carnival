import Component from '../../baseComponent';
import store from '../../../store/store';

interface INewCar {
  name: string,
  color: string
}

interface IUpdateControls {
  textInput: HTMLElement,
  colorInput: HTMLElement,
  button: HTMLElement
}
export default class ControlPanel extends Component {
  onCreate: () => void;

  onUpdate: () => void;

  onRace: () => void;

  onReset: () => void;

  onGenerate: () => void;

  onDataSend: () => void;

  nameInp: Component;

  colorInp: Component;

  sendDataButton: Component;

  constructor(parentNode: HTMLElement | null = null) {
    super(parentNode, 'div', ['control-panel']);

    const inputsWrapper = new Component(this.element, 'form', ['create-form']);
    
    this.nameInp = new Component(inputsWrapper.element, 'input', ['input-text']);
    this.nameInp.element.setAttribute('type', 'text');
    this.nameInp.element.setAttribute('maxlength', '25');
    const type = store.garageInputType;

    (this.nameInp.element as HTMLInputElement).value = store.inputData.name;
    
    this.nameInp.element.addEventListener('input', () => {
      store.inputData.name = (this.nameInp.element as HTMLInputElement).value;
    });

    this.colorInp = new Component(inputsWrapper.element, 'input', ['input-color']);
    this.colorInp.element.setAttribute('type', 'color');
    const colorChanged = store.inputData.color !== store.DEF_INP_COLOR;
    if (!colorChanged) {
      this.colorInp.element.setAttribute('value', `${store.DEF_INP_COLOR}`);
    } else {
      this.colorInp.element.setAttribute('value', `${store.inputData.color}`);
    }
      
    this.colorInp.element.addEventListener('input', () => {
      store.inputData.color = (this.colorInp.element as HTMLInputElement)
        .value;
    });

    this.sendDataButton = new Component(
      inputsWrapper.element,
      'button',
      ['send-btn', 'form-btn'],
      `create`
    );
    this.sendDataButton.element.addEventListener('click', () => this.onDataSend());

    const buttonsWrapper = new Component(this.element, 'div', [
      'buttons-wrapper',
    ]);
     
    const buttonNames = ['race', 'reset', 'generate'];

    const buttons: Array<Component> = [];
    
    buttonNames.forEach((btnName) => {
      const button = new Component(
        buttonsWrapper.element,
        'button',
        [`${btnName}-btn`, 'form-btn'],
        btnName
      );
      buttons.push(button);
    })

    buttons[0].element.addEventListener('click', () => this.onRace());
    buttons[1].element.addEventListener('click', () => this.onReset());
    buttons[2].element.addEventListener('click', () => this.onGenerate());

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
}
