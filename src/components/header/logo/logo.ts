import { BaseComponent } from "../../shared/base-component";
import './logo.scss';

export class Logo extends BaseComponent{
  
  constructor() {
    super('a', ['logo', 'header__logo']);
    this.element.setAttribute('href', '#game');


    this.element.innerHTML = `
      <span class="logo__text logo__text_upper">Match</span>
      <span class="logo__text logo__text_lower">Match</span>
    `
  }
}