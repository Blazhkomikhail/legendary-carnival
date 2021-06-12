import Component from '../base-component';
import { getWinners } from '../../api/api';
import { createCarImage } from '../garage-page/garage/carImage';
import { IWinner } from '../../shared/i-winner';
import store from '../../store/store';
import './winners.css';

// interface IWinners {
//   count: string,
//   items: Array<IWinner>
// }

export default class Winners extends Component {

  constructor(parentNode: HTMLElement | null = null) {
    super(parentNode, 'div', ['winners-page']);
    this.renderWinners();
  }

  public async renderWinners(page = 1): Promise<void> {
    await getWinners().then((result) => {
      const { count, items } = result;
      store.winnersPage = page;
      store.winners = items;
      const heading = new Component(
        this.element, 
        'h1', 
        ['winners-heading'], 
        `Winners(${count})`
        );
      const preHeading = new Component(
        this.element, 
        'h3', 
        ['winners-preheading'], 
        `Page #(${page.toString()})`
        );
      const table = new Component(null, 'div', ['winners-table'], `
        <table class="table" cellspacing="0" paddingspacing="0">
          <thead class="theadings">
            <th class="theading">Number</th>
            <th class="theading">Car</th>
            <th class="theading">Name</th>
            <th class="theading">Wins</th>
            <th class="theading">Best Time (seconds)</th>
          </thead>
          <tbody>
              ${ items.map((winner: IWinner, idx) => `
              <tr>
                <td>${idx + 1}</td>
                <td>${createCarImage(winner.car.color)}</td>
                <td>${winner.car.name}</td>
                <td>${winner.wins.toString()}</td>
                <td>${(winner.time).toString()}</td>
              </tr>
              `).join('')}
          </tbody>
        </table>
      `);
      this.element.appendChild(heading.element);
      this.element.appendChild(preHeading.element);
      this.element.appendChild(table.element);
    });
  }
}
