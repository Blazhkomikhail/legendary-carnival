import Component from '../../base-component';
import store from '../../../store/store';
import { getCars, deleteCar } from '../../../api/api';
import RenderCarField from './car';
import { ICar } from '../../../shared/i-car';
import ControlPanel from '../control-panel/control-panel';
import '../garage-page.css';

export default class Garage extends Component {
  subscriber: ControlPanel;

  onSelectClick: (id: number) => number;

  selectedCar: ICar;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['garage']);
    this.renderGarage();
  }

  public getSubscriber(subscriber: ControlPanel): void {
    this.subscriber = subscriber;
  }

  private clear() {
    this.element.innerHTML = '';
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
        carField.onSelect = () => {
          this.onCarSelect(carField);
          this.notifySubscriber();
        };
      });
    });
  }

  async onCarRemove(carPack: RenderCarField): Promise<void> {
    await deleteCar(carPack.carData.id);
    this.clear();
    this.renderGarage();
  }

  onCarSelect(carPack: RenderCarField) {
    this.selectedCar = carPack.carData;
  }

  public getSelectedCarData(): ICar {
    return this.selectedCar;
  }

  notifySubscriber(): void {
    const controls = this.subscriber.getUpdateControlers();
    (controls.colorInput as HTMLInputElement).disabled = false;
    (controls.textInput as HTMLInputElement).disabled = false;
    (controls.button as HTMLButtonElement).disabled = false;

    const selectedName = this.selectedCar.name;
    const selectedColor = this.selectedCar.color;
    (controls.textInput as HTMLInputElement).value = selectedName;
    (controls.colorInput as HTMLInputElement).value = selectedColor;
  }
}
