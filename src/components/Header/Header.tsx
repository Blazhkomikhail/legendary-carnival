import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { train, game } from '../../actions/modeActions';

import './header.scss';

const Header = () => {
  const mode = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <header className="header">
      <div className="header__content">
        <button className="header__menu-button">Menu</button>
        <button className="header__switcher" 
          onClick={() => ( mode === 'TRAIN' ? dispatch(train()) : dispatch(game()) )}>
          Switcher
        </button>
      </div>
    </header>
  )
}

export default Header;