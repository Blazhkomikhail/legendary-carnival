import Component from '../base-component';
import ControlPanel from './control-panel/control-panel';
import Garage from './garage/garage';
import { createCar, updateCar } from '../../api/api';
import { generateRandomCars, updateGarageStore } from '../../utils/utils';
import store from '../../store/store';
import './garage-page.css';

export default class GaragePage extends Component {
  constructor(parentNode: HTMLElement | null = null) {
    super(parentNode, 'div', ['garage-page']);

    const controlPanel = new ControlPanel(this.element);
    const garage = new Garage(this.element);

    garage.grabSubscriber(controlPanel);

    controlPanel.onCreate = async () => {
      const body = controlPanel.getCreateCarData();
      if (body.name.length === 0) return;
      store.createData.name = '';
      store.createData.color = store.DEF_INP_COLOR;
      (controlPanel.createCarName.element as HTMLInputElement).value = '';
      await createCar(body);
    };

    controlPanel.onUpdate = async () => {
      const { id } = store.updateData;
      const body = controlPanel.getUpdateCarData();
      store.updateData.name = '';
      (controlPanel.updateCarName.element as HTMLInputElement).value = '';
      await updateCar(id, body).then(() => {
        updateGarageStore(store.carsPage);
      });
    };

    controlPanel.onGenerate = async () => {
      return Promise.resolve()
        .then(() => {
          const cars = generateRandomCars();
          return cars;
        })
        .then((cars) => {
          const result = cars.map((car) => {
            return createCar(car);
          });
          return Promise.all(result);
        })
        .then(async () => {
          await updateGarageStore(store.carsPage).then(() =>
            garage.renderGarage(store.carsPage)
          );
        })
        .catch();
    };

    controlPanel.onRace = async () => {
      if (garage.isRacing) return;
      const racers = garage.getRacers();
      racers.forEach((racer) => {
        garage.onCarStart(racer);
      });
      garage.isRacing = true;
    };

    controlPanel.onReset = async () => {
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
        'update-input-text',
        'update-input-color',
        'update-btn',
        'select-button',
        'winners-btn',
        'garage-btn',
      ];

      const isInputTextActive =
        (controlPanel.updateCarName.element as HTMLInputElement).disabled ===
        false;
      const isTargetForbiden = forbidenTargetClassNames.some((className) =>
        (target as HTMLElement).classList.contains(className)
      );

      if (isInputTextActive && !isTargetForbiden) {
        (controlPanel.updateCarName.element as HTMLInputElement).value = '';
        (controlPanel.updateCarColor.element as HTMLInputElement).value =
          store.DEF_INP_COLOR;
        (controlPanel.updateCarName.element as HTMLInputElement).disabled =
          true;
        (controlPanel.updateCarColor.element as HTMLInputElement).disabled =
          true;
        (controlPanel.updateButton.element as HTMLButtonElement).disabled =
          true;
        store.updateData.color = store.DEF_INP_COLOR;
        store.updateData.name = '';
      }
    });
  }
}
