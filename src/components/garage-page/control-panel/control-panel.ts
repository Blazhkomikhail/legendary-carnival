import Component from '../../base-component';

interface INewCar {
  name: string,
  color: string
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

  constructor(parentNode: HTMLElement | null = null) {
    super(parentNode, 'div', ['control-panel']);

    const createWrapper = new Component(this.element, 'form', ['create-form']);
    this.createCarName = new Component(createWrapper.element, 'input');
    this.createCarName.element.setAttribute('type', 'text');
    this.createCarColor = new Component(createWrapper.element, 'input');
    this.createCarColor.element.setAttribute('type', 'color');
    this.createCarColor.element.setAttribute('value', '#e1d0d0');
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
    this.updateCarColor = new Component(updateWrapper.element, 'input');
    this.updateCarColor.element.setAttribute('type', 'color');
    this.updateCarColor.element.setAttribute('value', '#5d72bb');
    const updateButton = new Component(
      updateWrapper.element,
      'button',
      [],
      'UPDATE'
    );
    updateButton.element.addEventListener('click', () => this.onUpdate());

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

  public getNewCarData(): INewCar{
    return {
      name: (this.createCarName.element as HTMLInputElement).value,
      color: (this.createCarColor.element as HTMLInputElement).value
    }
  }

  public getUpdateCarData(): INewCar{
    return {
      name: (this.updateCarName.element as HTMLInputElement).value,
      color: (this.updateCarColor.element as HTMLInputElement).value
    }
  }
}
