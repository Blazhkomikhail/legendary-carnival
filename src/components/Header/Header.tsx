import React, { ReactElement, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Switcher from './Switcher/Switcher';

import './header.scss';

interface IHeaderProps {
  logined: boolean;
  handleLogined: (flag: boolean) => void;
}

const Header = ({logined, handleLogined}: IHeaderProps): ReactElement => {
  
  const history = useHistory();

  const isAuthorised = localStorage.getItem('loginData');
  useEffect(() => handleLogined(!!isAuthorised), [isAuthorised]);

  const authorisationHandler = () => {
    if (!logined) {
      history.push('/auth');
    } else {
      localStorage.removeItem('loginData');
      handleLogined(false);
      history.push('/');
    }
  };

  return (
    <header className="header">
      <div className="header__content">
        <Switcher />
        <div className="header__buttons-wrap">
          <Link to="/statistic" className="header__statistic-button">
            <div
              className="statistic-button"
              style={{ backgroundImage: `url(./icons/stat.png)` }}
            />
          </Link>
          <div
            role="presentation"
            className="header__admin-button"
            style={{
              backgroundImage: `url(./icons/${
                !logined ? 'login-icon.png' : 'logout-icon.png'
              })
                `,
            }}
            onClick={authorisationHandler}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
