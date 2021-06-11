import Component from '../../base-component';
import { createCarImage } from './carImage';
import { ICar } from '../../../shared/i-car';

export default class RenderCarField {
  onRemove: () => void;

  onSelect: () => void;

  onStart: () => void;
  
  onStop: () => void;

  carData: ICar;

  carImage: Component;

  flag: Component;

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
    const startBtn = new Component(engineButtons.element, 'button', ['start-button'], 'Start');
    const StopBtn = new Component(engineButtons.element, 'button', ['stop-button'], 'Stop');
    startBtn.element.addEventListener('click', () => this.onStart());
    StopBtn.element.addEventListener('click', () => this.onStop());
    this.carImage = new Component(
      launchPad.element,
      'div',
      ['car-image'],
      createCarImage(data.color)
    );
    this.flag = new Component(road.element, 'div', ['flag'], 'flag');
    parentNode.appendChild(generalLi.element);
  }

  public getCarFlagElems() {
    return { 
      car:  this.carImage,
      flag: this.flag
    }
  } 

}
