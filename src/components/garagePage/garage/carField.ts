import Component from '../../baseComponent';
import { createCarImage } from './carImage';
import { ICar } from '../../../shared/i-car';

interface IStartFinishPoints {
  car: Component;
  finish: Component;
}

interface IStartStopBtns {
  startBtn: Component;
  StopBtn: Component;
}

export default class CarField {
  onRemove: () => void;

  onSelect: () => void;

  onStart: () => void;

  onStop: () => void;

  carData: ICar;

  carImage: Component;

  startButton: Component;

  stopButton: Component;

  finish: Component;

  constructor(data: ICar, parentNode: HTMLElement) {
    this.carData = data;
    const generalLi = new Component(null, 'li', ['car-item']);
    const generalButtons = new Component(generalLi.element, 'div', [
      'general-buttons',
    ]);
    const selectBtn = new Component(
      generalButtons.element,
      'button',
      ['select-button'],
      'SELECT'
    );
    selectBtn.element.dataset.id = data.id.toString();
    selectBtn.element.addEventListener('click', () => this.onSelect());
    const removeBtn = new Component(
      generalButtons.element,
      'button',
      ['remove-button'],
      'REMOVE'
    );
    removeBtn.element.dataset.id = data.id.toString();
    removeBtn.element.addEventListener('click', () => this.onRemove());
    new Component(generalButtons.element, 'span', ['car-name'], data.name);
    const road = new Component(generalLi.element, 'div', ['road']);
    const launchPad = new Component(road.element, 'div', ['launch-pad']);
    const engineButtons = new Component(launchPad.element, 'div', [
      'engine-buttons',
    ]);
    this.startButton = new Component(
      engineButtons.element,
      'button',
      ['start-button'],
      'Start'
    );
    this.stopButton = new Component(
      engineButtons.element,
      'button',
      ['stop-button'],
      'Stop'
    );
    (this.stopButton.element as HTMLButtonElement).disabled = true;

    this.startButton.element.addEventListener('click', () => this.onStart());
    this.stopButton.element.addEventListener('click', () => this.onStop());
    this.carImage = new Component(
      launchPad.element,
      'div',
      ['car-image'],
      createCarImage(data.color)
    );
    this.finish = new Component(road.element, 'div', ['finish']);
    parentNode.appendChild(generalLi.element);
  }

  public getCarFinishElems(): IStartFinishPoints {
    return {
      car: this.carImage,
      finish: this.finish,
    };
  }

  public startStopButtons(): IStartStopBtns {
    return {
      startBtn: this.startButton,
      StopBtn: this.stopButton,
    };
  }
}
