import Component from '../base-component';
import ControlPanel from './control-panel/control-panel';
import Garage from './garage/garage';
import { createCar, updateCar } from '../../api/api';
import { generateRandomCars } from '../../utils/utils';
import store from '../../store/store';

export default class GaragePage extends Component {
  isRacing: boolean = false;

  constructor(parentNode: HTMLElement | null = null) {
    super(parentNode, 'div', ['garage-page']);

    const controlPanel = new ControlPanel(this.element);
    const garage = new Garage(this.element);

    garage.grabSubscriber(controlPanel);

    controlPanel.onCreate = async () => {
      const body = controlPanel.getNewCarData();
      if (body.name.length === 0) return;
      await createCar(body);
    };

    controlPanel.onUpdate = async () => {
      const { id } = garage.getSelectedCarData();
      const body = controlPanel.getUpdateCarData();
      await updateCar(id, body);
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
        .then(() => garage.renderGarage(store.carsPage))
        .catch(console.log.bind(console));
    };

    controlPanel.onRace = async () => {
      if(this.isRacing) return;
      const racers = garage.getRacers();
      racers.forEach((racer) => {
        garage.onCarStart(racer);
      })
      this.isRacing = true;
    }

    controlPanel.onReset = async () => {
        const racers = garage.getRacers();
        if (!racers.length) return;
        racers.forEach( async (racer) => {
          await garage.onCarStop(racer);
        })
        this.isRacing = false;
    }
  }
}
