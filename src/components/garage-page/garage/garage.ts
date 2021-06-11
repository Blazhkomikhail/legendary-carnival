import Component from '../../base-component';
import { getCars, deleteCar } from '../../../api/api';
import RenderCarField from './car';
import { ICar } from '../../../shared/i-car';
import ControlPanel from '../control-panel/control-panel';
import { paginationButtonsDisable, calcDistanceStartFinish, animation } from '../../../utils/utils';
import store from '../../../store/store';
import { startEngine, stopEngine, drive } from '../../../api/api';

import '../garage-page.css';

export default class Garage extends Component {
  subscriber: ControlPanel;

  onSelectClick: (id: number) => number;

  currentPage: number;

  selectedCar: ICar;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', ['garage']);
    this.renderGarage();
  }

  public grabSubscriber(subscriber: ControlPanel): void {
    this.subscriber = subscriber;
  }

  private clear() {
    this.element.innerHTML = '';
  }

  renderGarage(page = 1): void {
    this.clear();
    (async () => {
      const carsData = await getCars(page);
      return carsData;
    })()
      .then((res) => {
        this.currentPage = page;
        store.carsPage = page;
        const pageNumber = `Page #${page.toString()}`;
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
          carField.onStart = () => this.onCarStart(car, carField);
          carField.onStop = () => this.onCarStop(car, carField);
        });
        const paginationBox = new Component(this.element, 'div', [
          'pagination-box',
        ]);
        const prev = new Component(paginationBox.element, 'button', [], 'Prev');
        const next = new Component(paginationBox.element, 'button', [], 'Next');
        prev.element.addEventListener('click', () => this.onPrevPage());
        next.element.addEventListener('click', () => this.onNextPage());
        paginationButtonsDisable(prev, next, res.count, this.currentPage);
      })
      .catch(console.log.bind(console));
  }

  async onCarRemove(carPack: RenderCarField): Promise<void> {
    await deleteCar(carPack.carData.id);
    this.clear();
    this.renderGarage();
  }

  async onCarStart(carItem: ICar, currentCarField: RenderCarField) {
    const { id } = carItem;
    const { velocity, distance } = await startEngine(id);
    const time = Math.round(distance / velocity);
    const { car, flag } = currentCarField.getCarFlagElems();
    const htmlDistance = `${Math.round(calcDistanceStartFinish(car.element, flag.element))}px`;
    const animatedCar = animation(car, htmlDistance, time);
    const { success } = await drive(id);
    if (!success) {
      animatedCar.pause();
    } else {
      // animatedCar.finish();
    }
  }

  async onCarStop(carItem: ICar, currentCarField: RenderCarField) {
    const { id } = carItem;
    await stopEngine(id);

    if (store.animation[id]) window.cancelAnimationFrame(store.animation[id].id);
  }

  onCarSelect(carPack: RenderCarField) {
    this.selectedCar = carPack.carData;
  }

  onNextPage(): void {
    const page = this.currentPage + 1;
    store.carsPage = page;
    this.renderGarage(page);
  }

  onPrevPage(): void {
    const page = this.currentPage - 1;
    store.carsPage = page;
    this.renderGarage(page);
  }

  public getCurrentPage(): number {
    return this.currentPage;
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
