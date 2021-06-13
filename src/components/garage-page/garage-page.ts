import Component from '../base-component';
import ControlPanel from './control-panel/control-panel';
import Garage from './garage/garage';
import { createCar, updateCar } from '../../api/api';
import { generateRandomCars, updateGarageStore } from '../../utils/utils';
import store from '../../store/store';

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
      (controlPanel.createCarName.element as HTMLInputElement).value = '';
      await createCar(body);
    };

    controlPanel.onUpdate = async () => {
      const id = store.updateData.id;
      const body = controlPanel.getUpdateCarData();
      store.updateData.name = '';
      (controlPanel.updateCarName.element as HTMLInputElement).value = '';
      await updateCar(id, body).then(() => {
        updateGarageStore(store.carsPage);
      })
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
          await updateGarageStore(store.carsPage)
            .then(
              () => garage.renderGarage(store.carsPage)
            )
        })
        .catch(console.log.bind(console));
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
        garage.onCarStop(racer);
      });
      garage.isRacing = false;
      garage.amIFirst = true;
    };
  }
}
