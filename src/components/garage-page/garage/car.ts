import Component from '../../base-component';
import { createCarImage } from './carImage';
import { ICar } from '../../../shared/i-car';

export const renderCar = (car: ICar): HTMLElement => { 
  const generalLi = new Component(null, 'li', ['car-item']);
  const generalButtons = new Component(generalLi.element, 'div', ['general-buttons']);
  const selectBtn = new Component(generalButtons.element, 'button', ['select-button'], 'SELECT');
  selectBtn.element.dataset.id = car.id.toString();
  const removeBtn = new Component(generalButtons.element, 'button', ['remove-button'], 'REMOVE');
  removeBtn.element.dataset.id = car.id.toString();
  const name = new Component(generalButtons.element, 'span', ['car-name'], car.name);
  const road = new Component(generalLi.element, 'div', ['road']);
  const launchPad = new Component(road.element, 'div', ['launch-pad']);
  const engineButtons = new Component(launchPad.element, 'div', ['engine-buttons']);
  const startBtn = new Component(engineButtons.element, 'button', ['start-button'], 'Start');
  const stopBtn = new Component(engineButtons.element, 'button', ['stop-button'], 'Stop');
  const carImage = new Component(launchPad.element, 'div', ['car-image'], createCarImage(car.color));
  const flag = new Component(road.element, 'div', ['flag'], 'flag');
  return generalLi.element;
}