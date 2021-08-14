import BaseComponent from '../../shared/base-component';
import './logo.scss';

export default class Logo extends BaseComponent {
  constructor() {
    super(
      'a',
      ['logo', 'header__logo'],
      ` <span class="logo__text logo__text_upper">Match</span>
        <span class="logo__text logo__text_lower">Match</span>
      `
    );
    this.element.setAttribute('href', '#game');
  }
}
