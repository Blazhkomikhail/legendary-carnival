import Component from '../../base-component';
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

  onRace: () => void;

  onReset: () => void;

  onGenerate: () => void;

  createCarName: Component;

  createCarColor: Component;

  updateCarName: Component;

  updateCarColor: Component;

  updateButton: Component;

  constructor(parentNode: HTMLElement | null = null) {
    super(parentNode, 'div', ['control-panel']);

    const createWrapper = new Component(this.element, 'form', ['create-form']);
    this.createCarName = new Component(createWrapper.element, 'input');
    this.createCarName.element.setAttribute('type', 'text');
    (this.createCarName.element as HTMLInputElement).value = `${store.createData.name}`;
    this.createCarName.element.addEventListener('input', () => {
      store.createData.name = (this.createCarName.element as HTMLInputElement).value;
    })

    this.createCarColor = new Component(createWrapper.element, 'input');
    this.createCarColor.element.setAttribute('type', 'color');
    this.createCarColor.element.setAttribute('value', `${store.createData.color}`);
    this.createCarColor.element.addEventListener('input', () => {
      store.createData.color = (this.createCarColor.element as HTMLInputElement).value;
    })
    
    const createButton = new Component(
      createWrapper.element,
      'button',
      [],
      'CREATE'
    );
    createButton.element.addEventListener('click', () => this.onCreate());

    const updateWrapper = new Component(this.element, 'form', ['update-form']);
    this.updateCarName = new Component(updateWrapper.element, 'input');
    this.updateCarName.element.setAttribute('type', 'text');
    (this.updateCarName.element as HTMLInputElement).value = `${store.updateData.name}`;
    this.updateCarName.element.addEventListener('input', () => {
      store.updateData.name = (this.updateCarName.element as HTMLInputElement).value;
    })

    this.updateCarColor = new Component(updateWrapper.element, 'input');
    this.updateCarColor.element.setAttribute('type', 'color');
    this.updateCarColor.element.setAttribute('value', `${store.updateData.color}`);
    this.updateCarColor.element.addEventListener('input', () => {
      store.updateData.color = (this.updateCarColor.element as HTMLInputElement).value;
    })

    this.updateButton = new Component(
      updateWrapper.element,
      'button',
      [],
      'UPDATE'
    );

    const updateCarNameValue = (this.updateCarName.element as HTMLInputElement).value;

    if (updateCarNameValue === '') {
      (this.updateCarName.element as HTMLInputElement).disabled = true;
      (this.updateCarColor.element as HTMLInputElement).disabled = true;
      (this.updateButton.element as HTMLButtonElement).disabled = true;
    }

    this.updateButton.element.addEventListener('click', () => this.onUpdate());

    const buttonsWrapper = new Component(this.element, 'div', [
      'buttons-wrapper',
    ]);
    const raceButton = new Component(
      buttonsWrapper.element,
      'button',
      [],
      'Race'
    );
    raceButton.element.addEventListener('click', () => this.onRace());
    const resetButton = new Component(
      buttonsWrapper.element,
      'button',
      [],
      'RESET'
    );
    resetButton.element.addEventListener('click', () => this.onReset());
    const generateButton = new Component(
      buttonsWrapper.element,
      'button',
      [],
      'GENERATE CARS'
    );
    generateButton.element.addEventListener('click', () => this.onGenerate());
  }

  public getCreateCarData(): INewCar {
    return {
      name: (this.createCarName.element as HTMLInputElement).value,
      color: (this.createCarColor.element as HTMLInputElement).value,
    };
  }

  public getUpdateCarData(): INewCar {
    return {
      name: (this.updateCarName.element as HTMLInputElement).value,
      color: (this.updateCarColor.element as HTMLInputElement).value,
    };
  }

  public getUpdateControlers(): IUpdateControls {
    return {
      textInput: this.updateCarName.element,
      colorInput: this.updateCarColor.element,
      button: this.updateButton.element,
    };
  }
}
