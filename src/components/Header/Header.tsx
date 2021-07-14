import React, { ReactElement, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Switcher from './Switcher/Switcher';

import './header.scss';

const Header = (): ReactElement => {
  const [isLogined, setIsLogined] = useState(false);
  const history = useHistory();

  const isAuthorised = localStorage.getItem('loginData');
  useEffect(() => setIsLogined(() => !!isAuthorised), [])

  const authorisationHandler = () => {
    if (!isLogined) {
      history.push('/auth');
    } else {
      localStorage.removeItem('loginData');
      setIsLogined(false);
      history.push('/')
    }
  }

  return (
    <header className="header">
      <div className="header__content">
        <Switcher />
        <Link to="/statistic" className="header__statistic-button">
          <div
            className="statistic-button"
            style={{ backgroundImage: `url(./icons/stat.png)` }}
          />
        </Link>
        <button
          type="button"
          className="header__admin-button"
          style={{ backgroundImage: `url(./icons/${!isLogined ? 
                'login-icon.png' : 'logout-icon.png'})
              ` }}
          onClick={authorisationHandler}
        />
      </div>
    </header>
  );
};

export default Header;
