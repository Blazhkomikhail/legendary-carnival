import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import Switcher from './Switcher/Switcher';

import './header.scss';

const Header = (): ReactElement => {
  return (
    <header className="header">
      <div className="header__content">
        <Switcher />
        <Link to="/statistic" className="header__statistic-button">
          <div
            className="statistic-button"
            style={{ backgroundImage: `url(./stat.png)` }}
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
