import Component from '../base-component';

export default class Header extends Component {
  private readonly garageButton: Component;
  private readonly winnersButton: Component;

  constructor(parent: HTMLElement | null = null) {
    super(parent, 'header', ['header']);

    this.garageButton = new Component(this.element, 'button', [], 'Garage');
    this.garageButton.element.onclick = () => window.location.hash = 'garage';
    this.winnersButton = new Component(this.element, 'button', [], 'Winners');
    this.winnersButton.element.onclick = () => window.location.hash = 'winners';
  }
}