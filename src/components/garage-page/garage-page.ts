import Component from '../base-component';
import ControlPanel from './control-panel/control-panel';
import Garage from './garage/garage';
import { createCar, updateCar } from '../../api/api';

export default class GaragePage extends Component {
  constructor(parentNode: HTMLElement | null = null) {
    super(parentNode, 'div', ['garage-page']);

    const controlPanel = new ControlPanel(this.element);
    const garage = new Garage(this.element);

    garage.getSubscriber(controlPanel);

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
  }
}
