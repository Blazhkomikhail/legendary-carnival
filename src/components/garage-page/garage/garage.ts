import Component from '../../base-component';
import store from '../../../store/store';
import { getCars } from '../../../api/api';
import { renderCar } from './car';
import { ICar } from '../../../shared/i-car';
import '../garage-page.css';

export default class Garage extends Component {

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['garage']);
    this.renderGarage();
  }
  renderGarage() {
    (async () => {
      return await getCars();
    })().then((res) => {
      const pageNumber = `Page #${store.carsPage.toString()}`;
      const heding = new Component(this.element, 'h1', [], `Garage (${res.count})`);
      const preHeading = new Component(this.element, 'h2', [], pageNumber);
      const carsField = new Component(this.element, 'ul', ['garage']);
      res.items.forEach((car: ICar) => {
        carsField.element.appendChild(renderCar(car));
      })
    })
  }
}