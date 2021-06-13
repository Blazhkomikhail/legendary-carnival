import Component from '../base-component';
import { getWinners } from '../../api/api';
import { createCarImage } from '../garage-page/garage/carImage';
import { IWinner } from '../../shared/i-winner';
import store from '../../store/store';
import { constructPaginationBtns } from '../../utils/utils';
import './winners.css';

export default class Winners extends Component {

  currentPage: number;

  constructor(parentNode: HTMLElement | null = null) {
    super(parentNode, 'div', ['winners-page']);
    this.renderWinners();
  }

  public async renderWinners(
    page = 1, 
    sortBy: 'id' | 'wins' | 'time' = 'time',
    sortOrder: 'ASC' | 'DESC' = 'ASC'
    ): Promise<void> {
    this.clear();
    await getWinners(page, sortBy, sortOrder).then((result) => {
      const { count, items } = result;
      this.currentPage = page;
      store.winnersPage = page;
      store.winners = items;

      new Component(
        this.element, 
        'h1', 
        ['winners-heading'], 
        `Winners(${count})`
        );
      
      new Component(
        this.element, 
        'h3', 
        ['winners-preheading'], 
        `Page #(${page.toString()})`
        );
      
      new Component(this.element, 'div', ['winners-table'], `
        <table class="table" cellspacing="0" paddingspacing="0">
          <thead class="theadings">
            <th class="theading">Number</th>
            <th class="theading">Car</th>
            <th class="theading">Name</th>
            <th class="theading theading-wins">Wins</th>
            <th class="theading theading-bestTime">Best Time (seconds)</th>
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
      const wins = this.element.querySelector('.theading-wins');
      const bestTime = this.element.querySelector('.theading-bestTime');

      wins.addEventListener('click', () => this.onWinsClick());
      bestTime.addEventListener('click', () => this.onBestTimeClick());

      constructPaginationBtns(
        this.element, 
        this.onPrevPage,
        this.onNextPage,
        count,
        this.currentPage,
        this
      )
    });
  }

  clear(): void {
    this.element.innerHTML = '';
  }

  onNextPage(): void {
    const page = this.currentPage + 1;
    store.carsPage = page;
    this.renderWinners(page);
  }

  onPrevPage(): void {
    const page = this.currentPage - 1;
    store.carsPage = page;
    this.renderWinners(page);
  }

  onWinsClick(): void {
    if (store.sortOrder === 'ASC') {
      this.renderWinners(
        store.winnersPage,
        'wins',
        'DESC'
      )
    } else {
      this.renderWinners(
        store.winnersPage,
        'wins',
        'ASC'
      )
    }
  }

  onBestTimeClick(): void {
    if (store.sortOrder === 'ASC') {
      this.renderWinners(
        store.winnersPage,
        'time',
        'DESC'
      )
    } else {
      this.renderWinners(
        store.winnersPage,
        'time',
        'ASC'
      )
    }
  }
}
