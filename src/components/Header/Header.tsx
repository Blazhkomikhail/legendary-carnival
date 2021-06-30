import React from 'react';
import Switcher from './Switcher/Switcher';


import './header.scss';

const Header = () => {

  return (
    <header className="header">
      <div className="header__content">
        <button className="header__menu-button">Menu</button>
        < Switcher />
      </div>
    </header>
  )
}

export default Header;