import Component from '../../base-component';

export default class ControlPanel extends Component {

  onCreate: () => void;

  onUpdate: () => void;

  onRace: () => void;

  onReset: () => void;

  onGenerate: () => void;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['control-panel']);

    const createWrapper = new Component(this.element, 'form', ['create-form']);
    const createInputText = new Component(createWrapper.element, 'input');
    createInputText.element.setAttribute('type', 'text');
    const createInputColor = new Component(createWrapper.element, 'input');
    createInputColor.element.setAttribute('type', 'color');
    createInputColor.element.setAttribute('value', '#e1d0d0');
    const createButton = new Component(createWrapper.element, 'button', [], 'CREATE');
    createButton.element.addEventListener('click', () => this.onCreate());

    const updateWrapper = new Component(this.element, 'form', ['update-form']);
    const updateInputText = new Component(updateWrapper.element, 'input');
    updateInputText.element.setAttribute('type', 'text');
    const updateInputColor = new Component(updateWrapper.element, 'input');
    updateInputColor.element.setAttribute('type', 'color');
    updateInputColor.element.setAttribute('value', '#5d72bb');
    const updateButton = new Component(updateWrapper.element, 'button', [], 'UPDATE');
    updateButton.element.addEventListener('click', () => this.onUpdate());

    const buttonsWrapper = new Component(this.element, 'div', ['buttons-wrapper']);
    const raceButton = new Component(buttonsWrapper.element, 'button', [], 'Race');
    raceButton.element.addEventListener('click', () => this.onRace());
    const resetButton = new Component(buttonsWrapper.element, 'button', [], 'RESET');
    resetButton.element.addEventListener('click', () => this.onReset());
    const generateButton = new Component(buttonsWrapper.element, 'button', [], 'GENERATE CARS');
    generateButton.element.addEventListener('click', () => this.onGenerate());
  }
}

