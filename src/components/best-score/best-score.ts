import BaseComponent from '../shared/base-component';
import { DB } from '../../index';
import { IRecord } from '../../services/db/db';
import render from '../shared/render';
import './best-score.scss';

export default class BestScore extends BaseComponent {
  private userLines: HTMLElement[] = [];

  private contentWrap: BaseComponent;

  private heading: BaseComponent;

  constructor() {
    super('main', ['score']);
    this.contentWrap = new BaseComponent('div', ['score__content-wrap']);
    this.heading = new BaseComponent('h2', ['score__heading'], 'Best players');
    this.contentWrap.element.appendChild(this.heading.element);
    DB.getUsers().then((resData: IRecord[]) => {
      this.setData(resData);
    });

    render(this.element, [this.contentWrap.element]);
  }

  setData(data: IRecord[]): void {
    if (!data.length) {
      const noPlayersMessage = new BaseComponent(
        'p',
        ['score__message'],
        'There are no best players yet...'
      );
      render(this.contentWrap.element, [noPlayersMessage.element]);
    } else {
      data.sort((a, b) => Number(b.score) - Number(a.score));
      data.forEach((user, idx) => {
        if (idx > 9) return;
        this.userLines.push(BestScore.createScoreLine(user));
      });
      render(this.contentWrap.element, [...this.userLines]);
    }
  }

  static createScoreLine(data: IRecord): HTMLElement {
    const lineBox = new BaseComponent('div', ['score__line-box']);

    const userBox = new BaseComponent('div', ['score__user-box']);
    const avatar = new BaseComponent('div', ['score__avatar']);
    const userTextBox = new BaseComponent('div', ['score__user-text-box']);
    const fullName = new BaseComponent(
      'span',
      ['score__full-name'],
      `${data.firstName} ${data.lastName}`
    );
    const emailBox = new BaseComponent(
      'span',
      ['score__email'],
      `${data.email}`
    );
    render(userTextBox.element, [fullName.element, emailBox.element]);
    render(userBox.element, [avatar.element, userTextBox.element]);

    const scoreWrap = new BaseComponent('div', ['score__score-wrap']);
    const scoreTextBox = new BaseComponent(
      'span',
      ['score__score-text-box'],
      `Score: `
    );
    const scoreBox = new BaseComponent(
      'span',
      ['score__score-box'],
      `${data.score || 0}`
    );
    render(scoreWrap.element, [scoreTextBox.element, scoreBox.element]);

    render(lineBox.element, [userBox.element, scoreWrap.element]);

    return lineBox.element;
  }
}
