import Component from '../baseComponent';
import ControlPanel from './controlPanel/controlPanel';
import Garage from './garage/garage';
import { createCar, updateCar } from '../../api/api';
import { generateRandomCars, updateGarageStore } from '../../utils/utils';
import store from '../../store/store';
import './garagePage.css';

export default class GaragePage extends Component {
  private controlPanel: ControlPanel;

  constructor(parentNode: HTMLElement | null = null) {
    super(parentNode, 'div', ['garage-page']);

    this.controlPanel = new ControlPanel(this.element);
    const garage = new Garage(this.element);

    garage.grabSubscriber(this.controlPanel);

    this.controlPanel.onDataSend = async () => {
      if (store.garageInputType === 'create') {
        this.onCreate();
      } else {
        this.onUpdate();
      }
    };

    this.controlPanel.onGenerate = () => {
      const cars = generateRandomCars();
      const result = cars.map((car) => createCar(car));
      Promise.all(result)
        .then(() => updateGarageStore(store.carsPage))
        .then(() => garage.renderGarage(store.carsPage));
    };

    this.controlPanel.onRace = () => {
      if (garage.isRacing) return;
      const racers = garage.getRacers();
      racers.forEach((racer) => {
        garage.onCarStart(racer);
      });
      garage.isRacing = true;
    };

    this.controlPanel.onReset = () => {
      const racers = garage.getRacers();
      if (!racers.length) return;
      racers.forEach((racer) => {
        Garage.onCarStop(racer);
      });
      garage.isRacing = false;
      garage.amIFirst = true;
    };

    window.addEventListener('click', (e) => {
      const { target } = e;
      const forbidenTargetClassNames = [
        'input-text',
        'input-color',
        'update-btn',
        'select-button',
        'winners-btn',
        'garage-btn',
      ];

      const isInputEmpty =
        (this.controlPanel.nameInp.element as HTMLInputElement).value === '';

      const isTargetForbiden = forbidenTargetClassNames.some((className) =>
        (target as HTMLElement).classList.contains(className)
      );

      if (!isInputEmpty && !isTargetForbiden) {
        (this.controlPanel.nameInp.element as HTMLInputElement).value = '';
        (this.controlPanel.colorInp.element as HTMLInputElement).value =
          store.DEF_INP_COLOR;
        store.inputData.color = store.DEF_INP_COLOR;
        store.inputData.name = '';
      }
    });
  }

  onCreate = async () => {
    const body = this.controlPanel.getInpCarData();
    if (body.name.length === 0) return;
    store.inputData.name = '';
    store.inputData.color = store.DEF_INP_COLOR;
    (this.controlPanel.nameInp.element as HTMLInputElement).value = '';
    await createCar(body);
  };

  onUpdate = () => {
    const { id } = store.inputData;
    const body = this.controlPanel.getInpCarData();
    store.inputData.name = '';
    store.inputData.color = store.DEF_INP_COLOR;
    updateCar(id, body);
    store.garageInputType = 'create';
  };
}
