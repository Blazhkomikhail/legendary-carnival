import Component from '../baseComponent';
import ControlPanel from './controlPanel/controlPanel';
import Garage from './garage/garage';
import { createCar, updateCar } from '../../api/api';
import { generateRandomCars, updateGarageStore } from '../../utils/utils';
import store from '../../store/store';
import './garagePage.css';

export default class GaragePage extends Component {
  private controlPanel: ControlPanel;

  garage: Garage;

  constructor(parentNode: HTMLElement | null = null) {
    super(parentNode, 'div', ['garage-page']);

    this.controlPanel = new ControlPanel(
      this.element,
      this.onRaceHandler,
      this.onResetHandler,
      this.onGenerateHandler
    );
    this.garage = new Garage(this.element);
    this.garage.grabSubscriber(this.controlPanel);

    this.controlPanel.onDataSend = async () => {
      if (store.garageInputType === 'create') {
        this.onCreate();
      } else {
        this.onUpdate();
      }
    };
    this.clearControlsByAnywhereClick();
  }

  clearControlsByAnywhereClick = () => {
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
        this.controlPanel.makeContolsDefault();
      }
    });
  }

  onGenerateHandler = () => {
    const cars = generateRandomCars();
    const result = cars.map((car) => createCar(car));
    Promise.all(result)
      .then(() => updateGarageStore(store.carsPage))
      .then(() => this.garage.renderGarage(store.carsPage));
  };

  onRaceHandler = () => {
    if (this.garage.isRacing) return;
    const racers = this.garage.getRacers();
    racers.forEach((racer) => {
      this.garage.onCarStart(racer);
    });
    this.garage.isRacing = true;
  };

  onResetHandler = () => {
    const racers = this.garage.getRacers();
    if (!racers.length) return;
    racers.forEach((racer) => {
      Garage.onCarStop(racer);
    });
    this.garage.isRacing = false;
    this.garage.amIFirst = true;
  };

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
