import Component from '../../base-component';
import {
  getCars,
  deleteCar,
  startEngine,
  stopEngine,
  drive,
  createWinner,
  updateWinner,
  deleteWinner,
  IWinnerBody
} from '../../../api/api';
import RenderCarField from './car';
import { ICar } from '../../../shared/i-car';
import ControlPanel from '../control-panel/control-panel';
import {
  calcDistanceStartFinish,
  constructPaginationBtns,
  updadeWinnersStore,
  animation,
} from '../../../utils/utils';
import store from '../../../store/store';
import { IWinner } from '../../../shared/i-winner';

import '../garage-page.css';

const SECOND = 1000;

export default class Garage extends Component {
  subscriber: ControlPanel;

  onSelectClick: (id: number) => number;

  currentPage: number;

  racers: Array<RenderCarField> = [];

  selectedCar: ICar;

  raceDistance: string;

  animationID: AnimationPlaybackEventInit;

  amIFirst = true;

  isRacing = false;

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
        this.racers = [];
        this.currentPage = page;
        store.carsPage = page;
        const pageNumber = `Page #${page.toString()}`;

        new Component(this.element, 'h1', [], `Garage (${res.count})`);
        new Component(this.element, 'h2', [], pageNumber);

        const carsField = new Component(this.element, 'ul', ['garage']);

        res.items.forEach((car: ICar) => {
          const carField = new RenderCarField(car, carsField.element);
          this.racers.push(carField);
          carField.onRemove = () => this.onCarRemove(carField);
          carField.onStart = () => this.onCarStart(carField);
          carField.onStop = () => this.onCarStop(carField);
          carField.onSelect = () => {
            this.onCarSelect(carField);
            this.notifySubscriber();
          };
        });
        constructPaginationBtns(
          this.element, 
          this.onPrevPage, 
          this.onNextPage, 
          res.count, 
          store.carsPage,
          this
          );
      })
      .catch(console.log.bind(console));
  }

  async onCarRemove(carPack: RenderCarField): Promise<void> {
    await deleteCar(carPack.carData.id);
    await deleteWinner(carPack.carData.id).catch();
    this.clear();
    this.renderGarage();
  }

  async onCarStart(currentCarField: RenderCarField) {
    const startBtn = currentCarField.startButton.element;
    const stopBtn = currentCarField.stopButton.element;

    (startBtn as HTMLButtonElement).disabled = true;
    (stopBtn as HTMLButtonElement).disabled = false;

    const { id } = currentCarField.carData;
    const carItem = currentCarField.carData;

    const { velocity, distance } = await startEngine(id);
    const time = Number((Math.round(distance / velocity) / SECOND).toFixed(2));
    const winnerBody = { time, id, wins : 1 };
    const finisher = Object.assign({car: carItem}, winnerBody);

    const { car, flag } = currentCarField.getCarFlagElems();
    const htmlDistance = `${Math.round(
      calcDistanceStartFinish(car.element, flag.element)
    )}px`;
    store.animation[id] = animation(car, htmlDistance, time * SECOND);
    const { success } = await drive(id);
    if (!success) {
      (store.animation[id] as Animation).pause();
    } else {
      if (this.amIFirst && this.isRacing) {
        this.amIFirst = false;
        const winner = finisher;
        this.showCongrats(winner);
        this.addWinner(winnerBody);
        updadeWinnersStore();
      }
    }
  }

  private addWinner(body: IWinnerBody) {
    createWinner(body).catch(async () => {
      const { id } = body;
      const compareWinner = store.winners.find((winner) => winner.id = id);
      if (compareWinner.time > body.time) {
        body.wins = compareWinner.wins + 1;
        await updateWinner(body.id, body);
      } else {
        body.wins = compareWinner.wins + 1;
        body.time = compareWinner.time;
        await updateWinner(body.id, body);
      }
    })
  }

  private showCongrats(winner: IWinner): void {
    const modalCover = new Component(this.element, 'div');
    modalCover.element.style.cssText = `position: absolute; top: 0; left: 0; right: 0; 
    width: 100%; height: 100%; display: flex; justify-content: center; align-items: center`;
    const modal = new Component(modalCover.element, 'div');
    modal.element.style.cssText = `padding: 20px; position: fixed; border-radius: 4px; text-align: center; background-color: rgba(255,255,255,0.4)`;
    new Component(modal.element, 'h3', [], 'Congrats!');
    new Component(modal.element, 'p', [], `
      ${winner.car.name} came first!
      Time: ${(winner.time)} seconds.
    ` )
    const okButton = new Component(modal.element, 'button', [], 'OK');
    okButton.element.style.cssText = `border: none; outline-style: none; width: 40px; height: 30px; border-radius: 4px;`
    okButton.element.addEventListener('click', () => modalCover.destroy());
  }

  async onCarStop(currentCarField: RenderCarField) {
    const startBtn = currentCarField.startButton.element;
    const stopBtn = currentCarField.stopButton.element;

    (startBtn as HTMLButtonElement).disabled = false;
    (stopBtn as HTMLButtonElement).disabled = true;

    const { id } = currentCarField.carData;
    return new Promise(async (resolve,reject) => {
      await stopEngine(id).then(() => {
        if (!store.animation[id]) return;
        (store.animation[id] as Animation).pause();
        (store.animation[id] as Animation).cancel();
      });
    })
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

  public getRacers(): Array<RenderCarField> {
    return this.racers;
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
