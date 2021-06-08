import Component from '../../base-component';
import store from '../../../store/store';
import { getCars, deleteCar } from '../../../api/api';
import RenderCarField  from './car';
import { ICar } from '../../../shared/i-car';
import '../garage-page.css';

export default class Garage extends Component {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['garage']);
    this.renderGarage();
  }

  renderGarage(): void {
    (async () => {
      const carsData = await getCars();
      return carsData;
    })().then((res) => {
      const pageNumber = `Page #${store.carsPage.toString()}`;
      new Component(this.element, 'h1', [], `Garage (${res.count})`);
      new Component(this.element, 'h2', [], pageNumber);
      const carsField = new Component(this.element, 'ul', ['garage']);
      res.items.forEach((car: ICar) => {
        const carField = new RenderCarField(car, carsField.element);
          carField.onRemove = () => this.onCarRemove(carField);
      });
    });
  }

  async onCarRemove(carPack: RenderCarField): Promise<void> {
    await deleteCar(carPack.carData.id);
    this.clear();
    this.renderGarage();
  }

  clear() {
    this.element.innerHTML = '';
  }
}
