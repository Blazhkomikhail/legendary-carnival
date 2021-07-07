import React, { ReactElement } from 'react';
import './footer.scss';

const Footer = (): ReactElement => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <a
          className="footer__git-link"
          href="https://github.com/Blazhkomikhail"
          target="_blank"
          style={{ backgroundImage: `url(./icons/github.png)` }}
          rel="noreferrer"
        >
          {' '}
        </a>
        <a
          className="footer__logo"
          href="https://rs.school/js/"
          target="_blank"
          style={{ backgroundImage: `url(./icons/rs_school_js.svg)` }}
          rel="noreferrer"
        >
          {' '}
        </a>
        <p className="footer__year">2021&copy;</p>
      </div>
    </footer>
  );
};

export default Footer;
