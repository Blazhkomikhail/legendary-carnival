import React from 'react';
import Switcher from './Switcher/Switcher';
import { Link } from 'react-router-dom';

import './header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="header__content">
        < Switcher />
        <Link to={'/statistic'} className="header__statistic-button">
          <button className="statistic-button">Statistic</button>
      </Link>
      </div>
    </header>
  )
}

export default Header;